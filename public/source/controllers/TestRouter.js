enyo.kind({
	name: 'Bootplate.TestRouter'
  , kind: 'enyo.Router',

		//*@public
		/**
			If true, the router will respond to hash changes or internal events.
			If this flag is set to false, it will stop responding. This may be
			changed at any time.
		*/
		listening: true,

		//*@public
		/**
			If true, the router will neither respond to hash changes in the
			browser nor be able to trigger them. Instead, it may be used
			internally to maintain or trigger state changes in an application
			without changing location.
		*/
		internalOnly: false,

		//*@public
		/**
			The _defaultRoute_ should have the same structure as a normal
			route (hash). It may be arbitrarily assigned to this property
			or mixed into the routes array with a special _default: true_
			flag set. For any unmatched hash changes, this route will be
			executed and passed the path that was not matched.
		*/
		defaultRoute: null,

		//*@public
		/**
			By default, when a router is created, it will attempt to trigger
			the correct route for the current browser location. Set this
			to false to prevent this from happening.
		*/
		triggerOnStart: true,

		//*@public
		/**
			The _routes_ array constitutes the handlers for this router.
			Routes are string paths, static or dynamic, that route particular
			hash change events. They are defined in an array of hashes with
			a _handler_ (function), _path_ (for static and dynamic paths), an
			optional _context_ (for the handler), or a _default_ boolean true|false
			where that handler will be used when no other route can handle the
			hashchange event.
		*/
		routes: null,

		// ...........................
		// PROTECTED PROPERTIES

		//*@protected
		kind: "enyo.Controller",

		//*@protected
		_static_routes: null,

		//*@protected
		_dynamic_routes: null,

		//*@protected
		_current: "",

		// ...........................
		// COMPUTED PROPERTIES

		//*@public
		/**
			A computed property that will return the location as
			known by this router. This property will be synchronized
			with _window.location.hash_ unless it's _internalOnly_
			flag was set to true. Passing a string to this property
			via _set("location", "mylocation")_ will update the inner
			location known by this router.
		*/
		location: enyo.computed(function (loc) {
			if (loc) {
				loc = prepare(loc);
				if (!this.internalOnly) {
					window.location.hash = loc;
				} else {
					this.set("_current", loc);
				}
			} else {
				return prepare(this.get("_current"));
			}
		}, "_current", {cached: true}),

		// ...........................
		// PUBLIC METHODS

		//*@public
		/**
			Triggers a change without necessarily requiring a change to	occur.
			If called without a parameter, it will force the route that matches
			the current browser location to fire. If a string is passed in, this
			method will trigger an internal-only event (i.e., the	browser
			location will not be changed). If it is passed a hash, the method
			will try to use a _location_ property while looking for optional
			_change_ and _global_ properties.

			If the _change_ property is present and true, it will force a
			_location.hash_ change in the browser (this is always global).
			If the _global_ property is present and true and _change_ is
			not present or false, it will trigger an internal event that
			all routers will respond to (not just this instance).
		*/
		trigger: function (params) {
			if (!params) {
				params = {location: this.get("_current")};
			} else if ("string" === typeof params) {
				params = {location: params};
			}
			var loc = params.location;
			var global = params.global;
			var change = params.change;
			if (change) {
				window.location.hash = loc;
			} else {
				if (global) {
					hashDidChange(loc);
				} else {
					this._hash_changed(loc);
				}
			}
		},

		//*@public
		/**
			In very rare circumstances it may be useful to pass a path
			to the routes without using trigger or global hash changes
			with _path_ being a string that will be evaluated against
			the routes owned by this router.
		*/
		handle: function (path) {
			// fast track is to check against static routes first
			if (this._handle_static(path)) {
				return;
			}
			// then we check against dynamic paths in this simple scheme
			else if (this._handle_dynamic(path)) {
				/* do nothing */
			}
			else {
				this._handle_default(path);
			}
		},

		//*@public
		/**
			Can be used to programmatically add routes to the router
			where _route_ is a hash as described by the _routes_ array.
		*/
		addRoute: function (route) {
			var statics = this._static_routes;
			var dynamic = this._dynamic_routes;
			var regex;
			if (true === route['default']) {
				this.defaultRoute = route;
			}
			else if (token.test(route.path)) {
				regex = new RegExp(route.path.replace(token, "([a-zA-Z0-9]*)"));
				route.regex = regex;
				dynamic.push(route);
			} else {
				statics[route.path] = route;
			}
		},

		// ...........................
		// PROTECTED METHODS

		//*@protected
		constructor: function () {
			this._static_routes = {};
			this._dynamic_routes = [];
			this.inherited(arguments);
		},

		//*@protected
		create: function () {
			this.inherited(arguments);
			// make sure to initialize our routes prior
			// to registering for events
			this._setup_routes();
			// make sure we're up to date
			this.set("_current", prepare(window.location.hash));
			// ok, register for events
			listeners.push(this);
			// ok, if we need to go ahead and route our current
			// location, lets do it
			if (this.triggerOnStart) {
				this.trigger();
			}
		},

		//*@protected
		destroy: function () {
			var idx = enyo.indexOf(this, listeners);
			if (!~idx) {
				listeners.splice(idx, 1);
			}
			this.inherited(arguments);
		},

		//*@protected
		_hash_changed: function (hash) {
			hash = (function (prop) {
				if ("string" !== typeof hash) {
					// some browsers do not support the newUrl property
					// so we're forced to look at the current hash
					prop = hash.newUrl || window.location.hash;
				}
				return prepare(prop);
			})(hash || {});
			if (this.listening) {
				this.set("_current", hash);
				this.handle(hash);
			}
		},

		//*@protected
		_exec_handler: function (context, handler, args, route) {
			var fn = handler;
			// if the handler is defined as a string, we need to determine if
			// it is relative to the router, relative to the context, or a named
			// function in the global scope
			if ("string" === typeof handler) {
				if (context) {
					if ("string" === typeof context) {
						context = enyo.getPath(context);
					}
				}
				else {
					context = this;
				}
				// first check to see if the handler is a named property
				// on the router; otherwise, try the context itself
				fn = this[handler] || context[handler];
				if ("function" === typeof fn) {
					// in case we actually found it, let's not go hunting
					// next time
					route.handler = fn;
					route.context = context;
				}
			}
			// if we have an actual handler, let's execute it now
			if (fn && "function" === typeof fn) {
				fn.apply(context, args);
				return true;
			}
			// otherwise we couldn't determine what we were supposed to
			// do here
			return false;
		},

		//*@protected
		_handle_static: function (path) {
			var statics = this._static_routes;
			var route;
			var handler;
			var context;
			if ((route = statics[path])) {
				handler = route.handler;
				context = route.context;
				return this._exec_handler(context, handler, [path], route);
			}
			return false;
		},

		//*@protected
		_handle_dynamic: function (path) {
			var dynamic = this._dynamic_routes;
			var regex;
			var route;
			var handler;
			var context;
			var matches;
			var idx = 0;
			var len = dynamic.length;
			for (; idx < len; ++idx) {
				route = dynamic[idx];
				regex = route.regex;
				if ((matches = regex.exec(path))) {
					// we need to strip off the full match so we can
					// use the other matches as parameters
					matches = matches.slice(1);
					handler = route.handler;
					context = route.context;
					return this._exec_handler(context, handler, matches, route);
				}
			}
			return false;
		},

		//*@protected
		_handle_default: function (path) {
			var route = this.defaultRoute || {};
			var context = route.context;
			var handler = route.handler;
			return this._exec_handler(context, handler, [path], route);
		},

		//*@protected
		_setup_routes: function () {
			var routes = this.routes;
			var idx = 0;
			var len = routes.length;
			var route;
			for (; idx < len; ++idx) {
				route = routes[idx];
				if (!route) {
					continue;
				}
				this.addRoute(route);
			}
		}

	});
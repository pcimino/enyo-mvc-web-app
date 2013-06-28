enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.ParentContent"
    , kind: "enyo.Control"
    , id: 'parentContent'
    , controller: 'publicController'
    , insertBreak: function(owner) {
        owner.createComponent({ tag: "br"});
      }
    , insertInternalLink: function(owner, link, text) {
        owner.createComponent({
				    tag: 'a'
				    , id: 'tag_' + link
				    , attributes: {
					      href: '#/' + link
				    }
            , content: text
            , classes:"form-field-left-margin"
			    });
      }
    , bindInputData: function(bindOwner) {
        /* TODO This is wrong, and need to fix this.
           not using the Enyo bind mechanism, need to figure out the right way to do it dynamically
           This is how it should be done:

            var bindOwner = <set to the enyoInput component>;
            var bind = new enyo.Binding({
              from: ".$.username.value"
              , to: ".mvcApp.controllers.publicController.data.username"
              , owner: bindOwner});
            bindOwner.bindings.push(bind);
            // One of these refresh, first one is preferable
            bind.refresh();
            bindOwner.refreshBindings();
         */
         bindOwner.setData = function (inSender, inEvent) {
           console.log('bindOwner ' + inSender.name);
           mvcApp.controllers.publicController.data[inSender.name] = this.value;
           console.log(mvcApp.controllers.publicController.data[inSender.name]);
           return true;
         };
         bindOwner.handlers.onblur='setData'  ;
    }
  });
});
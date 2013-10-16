/**
* This is the parent content kind, Pages are the main body of the page
* - insertBreak() creates a newline in the page
* - insertInternalLink() creates a link within the application
* - bindInputData() Is used to bind input form data to events, still need to figure out why
*       the Enyo MVC Biolerplate doesn't seem to work with dynamially generated objects
* - rndLink() This doesn't really work correctly. The idea is some links need a random parameter so the router
*        will see it as a new link. In reality router just sees a corrupt link and sends it to the default page
*        (which is fine for now). But need to figure out a mechanism to force a redirect when the browser displays
*        the wrong url. Sometimes with navigating and refresh, the user can be on the login page, and
*        the url displays #/userSignup, so the user signup link stops working.
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.ParentPage"
    , kind: "enyo.Control"
    , id: 'parentPage'
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
        if (mvcApp.data.user) {
          // retrieve system messages
          mvcApp.authView.waterfall('onGetSystemMessages');
        }
    }
    , handlers: {
      onErrorSystemMessages: 'errorSystemMessages'
    }
    , insertFormSpace: function(owner, paddingInPx) {
        var padHeight = "padding-top:";
        if (paddingInPx) {
            padHeight = padHeight + paddingInPx;
            var last2 = (padHeight.substring(padHeight.length-2)).toLowerCase();
            if (last2.localeCompare("px") != 0) {
              padHeight = padHeight + "px";
            }
        } else {
            padHeight = padHeight + "150px";
        }
        owner.createComponent({kind: enyo.Control, style: padHeight});
    }
    , insertBreak: function(owner, optionalName) {
        owner.createComponent({ tag: "br", kind: 'enyo.Control', name: optionalName}); // optionalName used when fields need to be shown/hidden
    }
    , insertInternalLink: function(owner, link, text, optionalName) {
        owner.createComponent({
          tag: 'a'
          , id: 'tag_' + link
          , name: optionalName // used when fields need to be shown/hidden
          , attributes: {
                href: '#/' + link
          }
          , content: text
          , classes: "form-field-left-margin"
          , kind: 'enyo.Control'
        });
    }
    , bindInputData: function(bindOwner) {
      /* TODO This is wrong, and need to fix this.
         not using the Enyo bind mechanism, need to figure out the right way to do it dynamically
         This is how it should be done:

          var bindOwner = <set to the enyoInput component>;
          var bind = new enyo.Binding({
            from: ".$.username.value"
            , to: ".mvcApp.data.username"
            , owner: bindOwner});
          bindOwner.bindings.push(bind);
          // One of these refresh, first one is preferable
          bind.refresh();
          bindOwner.refreshBindings();
       */
       bindOwner.setData = function(inSender, inEvent) {
         console.log('bindOwner ' + inSender.name + ":" + mvcApp.data[inSender.name]);
         mvcApp.data[inSender.name] = this.value;
         return true;
       };
       bindOwner.handlers.onblur='setData';
    }
    /**
    * rndLink is a utility to add a random parameter to a URL
    * This helps prevent a situation where the page misloads due to error, but the link
    * won't resumbit. When this occurs you may be on an error display page, but the url still has
    * the previous url:  "...#/login"
    */
    , rndLink: function(url) {
        if (url.indexOf('?') > 0) {
          return url + "&r=" + enyo.irand(50000);
        }
        return url + "?r=" + enyo.irand(50000);
    }
    , errorSystemMessages: function(inSender, inEvent) {
        mvcApp.showErrorMessage(inEvent.title, inEvent.message);
    }
  });
});











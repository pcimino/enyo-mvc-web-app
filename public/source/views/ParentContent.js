enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.ParentContent"
    , kind: "enyo.Control"
    , id: 'parentContent'
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
          , classes:"form-field-left-margin"
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
       bindOwner.setData = function (inSender, inEvent) {
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
  });
});

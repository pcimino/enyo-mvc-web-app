// Parent for Navigation
enyo.kind({
  name: 'Bootplate.Navigation'
  , kind: "enyo.Component"
  , create: function() {
      this.inherited(arguments);
  }
  /**
  *   Traditional buttons work in the MVC app, but not with the
  *   user authentication check, somehow the mvcApp.controllers.routes.trigger({location:'/readUserList'});
  *   doesn't so the exact same thing as <a href="#/readUserList">Read user List</a>
  */
  , createLinkButton: function(owner, link, text, addClass) {
      var classList = "onyx-blue button-link ";
      if (addClass) {
        classList = classList + addClass;
      }
      owner.createComponent(
        { kind: "onyx.Button"
         , content: text
         , classes: classList
         , owner: owner
         , tag: 'a'
         , attributes: {
           href: '#/' + link
         }
      });
  }
  /**
  *   These buttons work, but sometimes run afoul of the isUserAuthenticated Logic
  */
  , createtriggerButton: function(owner, link, text, addClass) {
      var classList = "onyx-blue ";
      if (addClass) {
        classList = classList + addClass;
      }
      owner.createComponent({ kind: "onyx.Button", content: text, classes: classList,
              handlers: {
                onclick: 'onClickButton'
              },
              onClickButton: function () {
                mvcApp.controllers.routes.trigger({location:'/' + link});
                return true;
              }
            }
      );
  }
  , setupTopNav: function(owner) {
  }
  , setupLeftNav: function(owner) {
  }
  , setupRightNav: function(owner) {
  }
  , setupBottomNav: function(owner) {
  }
});








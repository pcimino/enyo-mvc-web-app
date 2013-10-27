/**
* This is the parent Navigation kind, Navigation kinds are used for building site navigation areas
*   Ideally this would simply be incorporated intot he body of the page, but it's a little messier
*   Also, left and right navigation areas: Not sure the best way to implement those? Slider panels? Layout areas?
*   No single elegant solution.
*
* - createLinkButton() Had trouble with buttons calling functions, seemed to behave differently when navigating internally
*      within the site. So created a button that actually behaves like a link.
* - createTriggerButton() creates a button that works onclick
* - setupTopNav() Child can implement this
* - setupLeftNav() Child can implement this
* - setupRightNav() Child can implement this
* - setupBottompNav() Child can implement this
*/
enyo.kind({
  name: 'Bootplate.Navigation'
  , kind: "enyo.Component"
  , style:"z-index:1;" // need this because the system notification is bigger than visible and overlaps the nav bar
  , create: function() {
      this.inherited(arguments);
  }
  /**
  *   Traditional buttons work in the MVC app, but not with the
  *   user authentication check, somehow the mvcApp.controllers.routes.trigger({location:'/readUserList'});
  *   doesn't so the exact same thing as <a href="#/readUserList">Read user List</a>
  *
  *   @owner
  *   @link
  *   @text
  *   @addClass
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
  *
  *   @owner
  *   @link
  *   @text
  *   @addClass
  */
  , createTriggerButton: function(owner, link, text, addClass) {
      var classList = "onyx-blue ";
      if (addClass) {
        classList = classList + addClass;
      }
      owner.createComponent({ kind: "onyx.Button", content: text, classes: classList,
        handlers: {
          onclick: 'onClickButton'
        },
        onClickButton: function() {
          mvcApp.controllers.routes.trigger({location:'/' + link});
          return true;
        }
      });
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











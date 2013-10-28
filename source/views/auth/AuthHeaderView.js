/**
* Build the authenticated header. Displays the Gravatar icon. If the user has an email registered with Gravatar, displays their avatar
*
* - Upon rendering sets the email setup in the application
* - setupGravatar() Provides a method to reset the email. Had timing issues with logging in, retrieving the gravatar and displaying
*      so there are probably some unnecessary calls to this method that can be cleaned up at some point
*/
enyo.kind({
  name: "Bootplate.AuthHeaderView"
  , kind: "enyo.FittableRows"
  , id: 'headerView'
  , tag: 'header' // give it a specific html tag
  , classes: "onyx"
  , fit: true
  , components: [
      {name: 'headerContainer', kind: "FittableColumns", fit: true, classes: "header-height header-width"
         , components: [
             {name:'headerLeftPage', kind: "enyo.Image", src: "assets/img/translunar.png", classes: "header-left"}
             , {name:'headerCenterPage', content: "auth header-center", fit: true, classes: "header-center"}
             , {name:'headerRightPage', name: 'gravatarDisplay', classes: "header-right", kind: "tld.Gravatar", email: '', imageSize: 75}
      ]}
    ]
  , handlers: {
     onSetupGravatar: 'setupGravatar'
  }
  , rendered: function() {
      this.inherited(arguments);
      this.$.gravatarDisplay.setEmail(mvcApp.getGravatarEmail());
  }
  , setupGravatar: function() {
      this.$.gravatarDisplay.setEmail(mvcApp.getGravatarEmail());
      this.$.gravatarDisplay.render();
      return true;
  }

});









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
             {name:'headerLeftContent', kind: "enyo.Image", src: "img/translunar.png", classes: "header-left"}
             , {name:'headerCenterContent', content: "auth header-center", fit: true, classes: "header-center"}
             , {name:'headerRightContent', name: 'gravatarDisplay', classes: "header-right", kind: "tld.Gravatar", email: '', imageSize: 75}
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






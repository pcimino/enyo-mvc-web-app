
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
             , {name:'headerRightContent', classes: "header-right", kind: "tld.Gravatar", email: '', imageSize: 75}
      ]}
    ]
  , handlers: {
     onSetupGravatar: 'setupGravatar'
  }
  , rendered: function() {
      this.inherited(arguments);
      this.$.headerRightContent.setEmail(mvcApp.getGravatarEmail());
      console.log('AuthHeaderView rendered complete');
  },
  setupGravatar: function() {
    console.log("setupGravatar " + mvcApp.getGravatarEmail())
    this.$.headerRightContent.setEmail(mvcApp.getGravatarEmail());
    //this.$.headerRightContent.render();
    console.log("Done")
    return true;
  }

});





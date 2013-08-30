
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

  , rendered: function() {
      this.inherited(arguments);
   //   this.setupGravatar();

      //this.gravatarEmail = mvcApp.data.userData.email;

      if (this.$.headerRightContent.$.gravatar) {
       // console.log("Gravatar exists, setting email");
        this.$.headerRightContent.setEmail(mvcApp.data.userData.email);
      } else {
        console.log("Create new Gravatar");
        this.$.headerRightContent.createComponent({name:"gravatar", kind: "tld.Gravatar", email: mvcApp.data.userData.email, imageSize: 75});
      }

      console.log('AuthHeaderView rendered complete');
  }

});




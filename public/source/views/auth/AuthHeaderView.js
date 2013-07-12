var AAZZ = {}
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
             , {name:'headerRightContent', classes: "header-right"}
      ]}
    ]
  , rendered: function() {
      this.inherited(arguments);
      console.log('AuthHeaderView enter rendered');
    AAZZ = this.$.headerRightContent
   //   this.$.headerRightContent.components.valueOf('gravatar').setEmail(mvcApp.data.userData.email);
    //
    this.$.headerRightContent.createComponent({name:"gravatar", kind: "tld.Gravatar", email: mvcApp.data.userData.email, imageSize: 75});
    console.log('AuthHeaderView rendered complete');
  }
});


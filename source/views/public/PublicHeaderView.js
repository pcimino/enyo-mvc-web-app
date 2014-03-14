/**
* This kind builds the public header.
*
*/
enyo.kind({
  name: 'Bootplate.PublicHeaderView'
  , kind: 'enyo.FittableRows'
  , id: 'headerView'
  , tag: 'header' // give it a specific html tag
  , classes: 'onyx'
  , fit: true
  , components: [
      {name: 'headerContainer', kind: "FittableColumns", fit: true, classes: "header-height header-width",
       components: [
         {name:'headerLeftPage', kind: "enyo.Image", src: "assets/img/translunar.png", classes: "header-left"},
         {name:'headerCenterPage', content: "public header-center", fit: true, classes: "header-center"},
         {name:'headerRightPage', content: "header-right", classes: "header-right", components: []}
       ]}
  ]
  , constructor: function(props) {
      this.inherited(arguments);
  }
});




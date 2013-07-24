
enyo.kind({
  name: "Bootplate.PublicHeaderView"
  , kind: "enyo.FittableRows"
  , id: 'headerView'
  , tag: 'header' // give it a specific html tag
  , classes: "onyx"
  , fit: true
  , components: [
      {name: 'headerContainer', kind: "FittableColumns", fit: true, classes: "header-height header-width",
       components: [
         {name:'headerLeftContent', kind: "enyo.Image", src: "img/translunar.png", classes: "header-left"},
         {name:'headerCenterContent', content: "public header-center", fit: true, classes: "header-center"},
         {name:'headerRightContent', content: "header-right", classes: "header-right", components: []}
       ]}
  ]
});


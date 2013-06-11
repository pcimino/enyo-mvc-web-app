
enyo.kind({
  name: "Bootplate.AuthenticatedHeaderView",
  kind: "enyo.FittableRows",
  id: 'headerView',
  tag: 'header', // give it a specific html tag
  classes: "onyx",
  fit: true,
  components: [
    {name: 'headerContainer', kind: "FittableColumns", fit: true, classes: "header-width",
     components: [
       {name:'headerLeftContent', kind: "enyo.Image", src: "img/translunar.png", classes: "header-left"},
       {name:'headerCenterContent', content: "authenticated header-center", fit: true, classes: "header-center"},
       {name:'headerRightContent', classes: "header-right", components: [ {name:"gravatar", kind: "tld.Gravatar", imageSize: 75}]}
     ]}
  ]
});


enyo.kind({
  name: 'Bootplate.PublicFooterView',
  kind: "enyo.FittableRows",
  id: 'footerView',
  tag: 'footer', // give it a specific html tag
  classes: "onyx",
  fit: true,
  components: [
    {name: 'footerContainer', kind: "FittableColumns", fit: true, classes: "footer-width", components: [
      {name:'footerLeftContent', content: "public footer left", classes: "footer-left"},
      {name:'footerCenterContent', content: "footer center", fit: true, classes: "footer-center"},
      {name:'footerRightContent', content: "footer right", classes: "footer-right"}
    ]}
  ]
});

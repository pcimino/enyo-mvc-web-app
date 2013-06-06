// http://enyojs.com/sampler/debug.html
// http://enyojs.com/api/#enyo.Control

enyo.kind({
  name: 'Bootplate.ParentView',
  kind: "enyo.FittableRows",
  classes: "onyx",
  tag: 'body',
  fit: true,
  setupHeaderContent: function() {
    if (this.$.headerContainer) this.$.headerContainer.destroy();
    this.createComponent({name: 'headerContainer', kind: 'Bootplate.HeaderView'});
  },
  setupFooterContent: function() {
    if (this.$.footerContainer) this.$.footerContainer.destroy();
    this.createComponent({name: 'footerContainer', kind: 'Bootplate.FooterView'});
  }
});

enyo.ready(function () {
	Bootplate.TempCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('temp-bootplate-enyo'),
    model: Bootplate.TempModel
  });
});

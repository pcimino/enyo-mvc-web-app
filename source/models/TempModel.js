
enyo.ready(function () {
  Bootplate.TempModel = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    }
  });
});

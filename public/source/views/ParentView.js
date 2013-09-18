
/**
* This is the parent view for all view kinds
* - showMessage() calls the popup
* - setupHeaderContent() should be implemented by each child
* - setupBodyContent() should be implemented by each child
* - setupFooterContent() should be implemented by each child
*/
enyo.kind({
  name: 'Bootplate.ParentView'
  , kind: "enyo.FittableRows"
  , classes: "onyx"
  , tag: 'body'
  , fit: true
  , classes: "onyx"
  , published : {
      header : {}
    , body: {}
    , footer: {}
    , notification: {}
    , notificationPop: {}
  }
  , handlers: {
     onShowSystemMessage: 'systemMessage'
     , onShowErrorMessage: 'showErrorMessage'
     , onShowWarningMessage: 'showWarningMessage'
     , onShowInfoMessage: 'showInfoMessage'
  }
  , rendered: function() {
      this.inherited(arguments);
  }
  , setupBodyContent: function() {
      this.notification = this.createComponent({kind: "Notification", name: "notif", owner: this});
      this.createComponent({name:'bodyContainer', fit: true, classes: "body-height enyo-center body-margin"});
  }
  , setupFooterContent: function() {
      this.notificationPop = this.$.pageContainer.createComponent({kind: "Notification", name: "notifPop", owner: this.$.pageContainer});
  }
  , systemMessage: function(inSender, inEvent) {
      this.notification.sendNotification({
					title: inEvent.title
					, message: inEvent.message
					, icon: 'img/alert-yellow-64.png'
					, theme: "notification.PageCurl"
					, stay: true
					, duration: 10
				}, enyo.bind(this, "archiveSystemMessage"));
  }
  , showErrorMessage: function(inSender, inEvent) {
      this.showMessage(inEvent.title, inEvent.message, 'img/alert-red-64.png', 'notification.Pop');
  }
  , showWarningMessage: function(inSender, inEvent) {
      this.showMessage(inEvent.title, inEvent.message, 'img/alert-yellow-64.png', 'notification.Pop');
  }
  , showInfoMessage: function(inSender, inEvent) {
      this.showMessage(inEvent.title, inEvent.message, 'img/alert-green-64.png', 'notification.Pop');
  }
  , showMessage: function(title, message, icon, theme) {
       this.notificationPop.sendNotification({
					title: title
					, message: message
					, icon: icon
					, theme: theme
					, stay: true
					, duration: 10
				}, enyo.bind(this, "dummy"));
  }
  , archiveSystemMessage: function(inSender, inEvent) {
      console.log(JSON.stringify(inEvent))
  }
  , dummy: function(inSender, inEvent) {

  }
});







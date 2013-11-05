
/**
* This is the parent view for all view kinds
* - showMessage() calls the popup
* - setupHeaderPage() should be implemented by each child
* - setupPageBody() should be implemented by each child
* - setupFooterPage() should be implemented by each child
*/
enyo.kind({
  name: 'Bootplate.ParentView'
  , kind: "enyo.FittableRows"
  , classes: "onyx"
  , tag: 'body'
  , fit: true
  , published : {
      header : {}
    , footer: {}
    , pageContainer: {}
    , navigation: {}
    , notification: {}
    , notificationPop: {}
  }
  , handlers: {
     onShowSystemMessage: 'systemMessage'
     , onShowErrorMessage: 'showErrorMessage'
     , onShowWarningMessage: 'showWarningMessage'
     , onShowInfoMessage: 'showInfoMessage'
     , onGetSystemMessages: 'getSystemMessages'
     , onGetSystemMessagesResult: 'getSystemMessagesResult'
  }
  , rendered: function() {
      this.inherited(arguments);
  }
  , setupHeaderPage: function() {
  }
  , setupPageBody: function() {
      this.notification = this.createComponent({kind: "Notification", name: "notif", owner: this});
  }
  , setupFooterPage: function() {
      this.notificationPop = this.$.pageContainer.createComponent({kind: "Notification", name: "notifPop", owner: this.$.pageContainer});
  }
  , systemMessage: function(inSender, inEvent) {
    if (inEvent.title && inEvent.message) {
       this.notification.sendNotification({
					title: inEvent.title
					, message: inEvent.message
					, icon: 'assets/img/alert-yellow-32.png'
					, theme: "notification.PageCurl"
          , messageId: inEvent.messageId
					, stay: true
					, duration: 10
				}, enyo.bind(this, "archiveSystemMessage"));
    }
  }
  , showErrorMessage: function(inSender, inEvent) {
      this.showMessage(inEvent.title, inEvent.message, 'assets/img/alert-red-32.png', 'notification.Pop');
  }
  , showWarningMessage: function(inSender, inEvent) {
      this.showMessage(inEvent.title, inEvent.message, 'assets/img/alert-yellow-32.png', 'notification.Pop');
  }
  , showInfoMessage: function(inSender, inEvent) {
      this.showMessage(inEvent.title, inEvent.message, 'assets/img/alert-green-32.png', 'notification.Pop');
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
        // archive the system message
        if (inSender.messageId) {
          var ajaxArchiveSysMessage = new AJAX.ArchiveSystemMessage({owner:this, fireEvent:'onShowSystemMessage'});
          ajaxArchiveSysMessage.makeRequest({systemMessageId: inSender.messageId});
        }
  }
  , dummy: function(inSender, inEvent) {

  }
  // Retrieve system messages
  , getSystemMessages: function(inSender, inEvent) {
      // load the system message
      var jsonpGetSysMessages = new JSONP.GetSystemMessages({owner:this, fireEvent:'onGetSystemMessagesResult'});
      jsonpGetSysMessages.makeRequest({});
  }
  // Display system messages
  , getSystemMessagesResult: function(inSender, inEvent) {
      // clear the notifications programmatically before reloading
      this.notification.removeAllNotifications();
      for (var i = 0; i < inEvent.length; i++) {
        mvcApp.showSystemMessage(inEvent[i].subject, inEvent[i].message, inEvent[i]._id);
      }

      return true;
  }
});



















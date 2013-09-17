
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
  , rendered: function() {
      this.inherited(arguments);

    this.notification.sendNotification({
					title: "Test",
					message: new Date(),
					icon: "http://icons.iconseeker.com/png/fullsize/ivista-2-os-x-icons/warning-4.png",//http://gakuseisean.deviantart.com
					theme: "notification.PageCurl",
					stay: true,
					duration: 10
				}, enyo.bind(this, "dummy"));
   this.notificationPop.sendNotification({
					title: "Test",
					message: new Date(),
					icon: "http://icons.iconseeker.com/png/fullsize/ivista-2-os-x-icons/warning-4.png",//http://gakuseisean.deviantart.com
					theme: "notification.Pop",
					stay: true,
					duration: 10
				}, enyo.bind(this, "dummy"));


  }
  , showMessage: function(messageText) {
      console.log('showMessage: ' + messageText);
      this.$.popupDialog.showMessage(messageText);

  }
  , setupBodyContent: function() {
      this.notification = this.createComponent({kind: "Notification", name: "notif", owner: this});
      this.createComponent({name:'popupDialog', kind: "PopupDialog"});
      this.createComponent({name:'bodyContainer', fit: true, classes: "body-height enyo-center body-margin"});
  }
  , setupFooterContent: function() {
      this.notificationPop = this.$.pageContainer.createComponent({kind: "Notification", name: "notifPop", owner: this.$.pageContainer});
  }
  , dummy: function() {

  }
});





/**
* Display content for showing the user a message on a page
*/
enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.PublicMessageDisplayContent"
    , kind: "Bootplate.ParentContent"
    , id: 'messageDisplayContent'
    , published: {
        contentComponent: null
    }
    , setupBodyContent: function(owner, renderFlag) {
        console.log("Bootplate.MessageDisplayContent");
        this.insertBreak(owner);

        var displayClasses = "text-input-error-box form-field-left-margin";
        if (mvcApp.broadcast.displayClass != 'error')  {
          displayClasses = "text-input-confirm-box form-field-left-margin";
        }
        this.contentComponent = owner.createComponent(
            { content: mvcApp.broadcast.message
              , classes: displayClasses
              , style:'margin-right:25%;'
            }
        );
        this.insertBreak(owner);
        this.insertBreak(owner);
        this.insertInternalLink(owner, this.rndLink('login'), 'User Login');

      // only call this on navigation, not initial load
        if (renderFlag) owner.render();
  } // end setupBodyContent
  , setErrorMessage: function(newText) {
      this.contentComponent.setContent(newText);
      this.contentComponent.removeClass("text-input-confirm-box");
      this.contentComponent.addClass("text-input-error-box");
  }
  , setConfirmMessage: function(newText) {
      this.contentComponent.setContent(newText);
      this.contentComponent.removeClass("text-input-error-box");
      this.contentComponent.addClass("text-input-confirm-box");
  }
});
});
/**
* Display content for showing the user a message on a page. Can be used for displaying an
*   error message or a confirmation messsage
*
* - setupPageBody()
* - setErrorMessage()
* - setConfirmMessage()
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.PublicMessageDisplayPage'
    , kind: 'Bootplate.ParentPage'
    , id: 'messageDisplayPage'
    , authFlag: false
    , published: {
        contentComponent: null
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        this.insertFormSpace(owner);

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
        owner.render();
    } // end setupPageBody
    , setErrorMessage: function(newText) {
        this.contentComponent.setPage(newText);
        this.contentComponent.removeClass("text-input-confirm-box");
        this.contentComponent.addClass("text-input-error-box");
    }
    , setConfirmMessage: function(newText) {
        this.contentComponent.setPage(newText);
        this.contentComponent.removeClass("text-input-error-box");
        this.contentComponent.addClass("text-input-confirm-box");
    }
  });
});







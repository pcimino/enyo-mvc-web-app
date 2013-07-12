enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.SystemUnavailableContent"
    , kind: "Bootplate.ParentContent"
    , id: 'systemUnavailableContent'
    , published: {
        contentMessage: "The system is currently unavailable. Please try again later."
    }
    , setupBodyContent: function(owner, renderFlag) {
        console.log("Bootplate.SystemUnavailableContent");
        this.insertBreak(owner);

        owner.createComponent(
            { content: this.contentMessage
              , classes:"form-field-left-margin text-input-error-box"
              , style:'margin-right:25%;'
            }
        );
        this.insertBreak(owner);
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'login', 'User Login');

      // only call this on navigation, not initial load
        if (renderFlag) owner.render();
      } // end setupBodyContent
  });
});
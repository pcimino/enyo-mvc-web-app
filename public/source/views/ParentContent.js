enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.ParentContent"
    , kind: "enyo.Control"
    , id: 'parentContent'
    , controller: 'publicController'
    , insertBreak: function(owner) {
        owner.createComponent({ tag: "br"});
      }
    , insertInternalLink: function(owner, link, text) {
        owner.createComponent({
				    tag: 'a'
				    , id: 'tag_' + link
				    , attributes: {
					      href: '#/' + link
				    }
            , content: text
            , classes:"form-field-left-margin"
			    });
      }
  });
});
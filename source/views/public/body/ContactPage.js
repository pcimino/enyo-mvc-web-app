/**
* Contact page
*
* - setupPageBody()
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.ContactPage'
    , kind: 'Bootplate.PublicPage'
    , id: 'contactPage'
    , published: {
        contentComponent: null
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        this.insertFormSpace(owner);
        owner.createComponent({
          tag: 'a'
          , id: 'tag_contact'
          , attributes: {
              target: '_blank'
            , href: 'https://github.com/pcimino/enyo-mvc-app'
          }
          , content: "Github Repo for this project"
          , classes: "form-field-left-margin"
          , kind: 'enyo.Control'
        });
        this.insertBreak(owner);
        this.insertBreak(owner);
        this.insertInternalLink(owner, this.rndLink('login'), 'User Login');

        owner.render();
    } // end setupPageBody
  });
});








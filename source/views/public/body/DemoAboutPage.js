/**
* Demo About page
*
* - setupPageBody()
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.DemoAboutPage'
    , kind: 'Bootplate.PublicPage'
    , id: 'demoPage'
    , published: {
        contentComponent: null
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        this.insertFormSpace(owner);

        owner.createComponent({content:'The database is running on AWS and may purged at any time.', classes: "center"});
        this.insertBreak(owner);

        owner.createComponent({content:'This demonstration project is an Enyo front end for a REST server.', classes: "center"});

        owner.createComponent({
          tag: 'a'
          , id: 'tag_contact'
          , attributes: {
              target: '_blank'
            , href: 'https://github.com/pcimino/enyo-mvc-web-app'
          }
          , content: "Github Repo for the Enyo front end project."
          , classes: "form-field-left-margin"
          , kind: 'enyo.Control'
        });

        this.insertBreak(owner);
        this.insertBreak(owner);

        owner.createComponent({content:'The backend server is running Node.js and MongoDB.', classes: "center"});
        owner.createComponent({
          tag: 'a'
          , id: 'tag_contact'
          , attributes: {
              target: '_blank'
            , href: 'https://github.com/pcimino/nodejs-restify-mongodb'
          }
          , content: "Github Repo for the Node.js and MongoDB server configuration."
          , classes: "form-field-left-margin"
          , kind: 'enyo.Control'
        });


        owner.render();
    } // end setupPageBody
  });
});









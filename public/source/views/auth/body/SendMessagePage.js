// http://macfja.github.io/enyo2-lib/onyx/dynamiclist.html

/**
* SendMessagePage kind,
* used to create and send messages between users
*
* - setupPageBody() Impemented method
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.SendMessagePage"
    , kind: "Bootplate.ParentPage"
    , id: 'sendMessagePage'
    , authFlag: true // used to help determine if user has access to this page
    , published : {
      users:null
    }
    , handlers: {
      onLoadUserScreen: 'loadUserScreen'
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {

        this.createComponent({content:'Search for Users', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;", owner:this});

        this.createComponent({ kind: "FittableColumns", style: "margin-left: 10%;", components: [
            { name: "nameSearch"
              , kind: "onyx.Input"
              , classes:"form-input-box "
              , placeholder: "Name"
              , style: "width:15%; "
              , owner: this
            }
            , { name: "usernameSearch"
              , kind: "onyx.Input"
              , classes:"form-input-box "
              , placeholder: "Username"
              , style: "width:15%; margin-left:5%; "
              , owner: this
            }
            , { name: "emailSearch"
              , kind: "onyx.Input"
              , classes:"form-input-box "
              , placeholder: "Email"
              , style: "width:15%; margin-left:5%; "
              , owner: this
            }
          ]
        });
        this.createComponent({ kind: "onyx.Button"
            , content: "Search for User"
            , name: "ArchiveMessageThread"
            , classes: "onyx-blue "
            , style: "margin-left: 10%;margin-top: 30px;"
            , ontap: 'searchForUser'
            , owner:this
        });

        this.createComponent({content:'Users', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;", owner:this});
        this.createComponent({name: "userList"
            , kind: "macfja.DynamicList"
            , defaultRowHeight: 20
            , style: "width:50%; margin-left:10%; height: 150px; border: 1px solid grey"
            , onSetupRow: "setupRow"
            , classes:"form-input-box form-top-margin"
            , onRowTap: "userTap"
            , owner: this
          });
          owner.render();
    } // end setupPageBody
    , setupRow: function(inSender, inEvent) {
        inEvent.template={components: [
          { kind: "FittableColumns", components: [
              {content: "Name: ", classes:'list-item-margin bold-text'}
              , {content: inEvent.context.name}
              , {content: "Username: ", classes:'list-item-margin bold-text'}
              , {content: inEvent.context.username}
          ]}
        ]};
    }
    , searchForUser: function() {
        // load the user list
        var jsonpGetUserList = new JSONP.GetUserList({owner:this, fireEvent:'onLoadUserScreen'});
      console.log("searchForUser")
        jsonpGetUserList.makeRequest({username:this.$.usernameSearch.value, email:this.$.emailSearch.value, name:this.$.nameSearch.value, itemsPerPage:-1, pageNumber:'',pages:1, sortField:'', ascendingSortFlag:true});
    }
    // Display system messages
    , loadUserScreen: function(inSender, inEvent) {
        this.$.userList.setItems(inEvent.users);
        this.users = inEvent.users;
        return true;
    }
    , userTap: function(inSender, inEvent) {

      console.log("User Tap ", this.users[inEvent.index])
    }
  });
});




















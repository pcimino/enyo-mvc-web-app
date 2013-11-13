/**
* AdminUserManagementPage
*
* - setupPageBody() Implemented setup method
*/
enyo.ready(function () {
  enyo.kind({
    name: 'Bootplate.AdminUserManagementPage'
    , kind: 'Bootplate.AuthPage'
    , id: 'adminUserManagementPage'
    , handlers: {
        onLoadUserDetailList: 'loadUserDetailList'
        , onAdminUserDetailsResult: 'adminUserDetailsResult'
        , onUsernameStatus: 'usernameStatus'
        , onEmailStatus: 'emailStatus'
        , onAdminUserUpdateResult: 'adminUserUpdateResult'
        , onUserDeleteResult: 'userDeleteResult'
    }
    , published: {
      usernameRef : {}
      , emailRef : {}
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
        if (!mvcApp.adminFlag) {
          mvcApp.controllers.routes.trigger({location:'/home'});
        }
        mvcApp.adminUserDetails = {}
    }
    , setupPageBody: function(owner) {
        this.createComponent({name: 'confirmationPopup'
                            , kind: "onyx.Popup"
                              , style: "height:200px; width:200px;"
                            , centered: true
                            , float: true
                            , fit: true
                            , owner: this, components: [
                              {content: "Are you sure?", style: "margin-left:45px;margin-top:50px;margin-bottom:50px; "},
          {kind: "enyo.FittableColumns", owner: this, components: [
            {kind: "onyx.Button", content: "OK", ontap: "confirmClick", owner:this, classes: "onyx-blue page-left-justified"},
            {kind: "onyx.Button", content: "Cancel", ontap: "cancelClick", owner:this, classes: "onyx-blue page-left-justified"}
          ]}
        ]});

        this.createComponent({content:'Search for Users', classes: 'page-left-justified', style: "margin-bottom: 10px;padding-top: 30px;", owner:this});

        this.createComponent({ kind: "FittableColumns", classes: "page-left-justified", components: [
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
            , classes: "onyx-blue page-left-justified"
            , style: "margin-top: 30px;"
            , ontap: 'searchForUser'
            , owner:this
        });
        this.createComponent({content:'Users', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;", owner:this});
        this.createComponent({name: "userList"
            , kind: "macfja.DynamicList"
            , defaultRowHeight: 20
            , style: "width:50%; height: 150px; border: 1px solid grey"
            , onSetupRow: "setupRow"
            , classes:"form-input-box form-top-margin page-left-justified"
            , onRowTap: "userTap"
            , owner: this
          });

        var usernameContainer = this.createComponent({ kind: "FittableColumns", classes: "nice-padding page-left-justified", owner:this});

        this.usernameRef = usernameContainer.createComponent(
        { name: "username"
          , kind: "onyx.Input"
          , classes:"form-input-box"
          , placeholder: "Username"
          , owner: this
          , handlers: {
              onblur: 'usernameChanged'
            , onkeyup: 'usernameChanged'
          }
          /**
          * When the username changes, check the length, if short remove any indicator classes
          * If longer than 3 characters, check availability, bubble the event up to the PublicController
          */
          , usernameChanged: function(inSender, inEvent) {
              if (!this.value || this.value.length < 4) {
                this.removeClass("text-input-confirm-box");
                this.removeClass("text-input-error-box");
              } else {
                mvcApp.waterfall('onCheckUsername', {username:this.value});
              }
              return true;
          }
        });
        usernameContainer.createComponent({name: 'currentUsername', content:'', owner:this});
        usernameContainer.createComponent({content:'Username change will require a password reset.', classes:' page-left-justified', owner:this});

        this.bindDetailData(this.$.username);
        // TODO figure out and clean this up
        // Why doesn't the "handlers : {}"" definition above work?
        // presumably the ownership chain on the dynamic components
        owner.handlers.onUsernameStatus = this.usernameStatus;
        owner.handlers.onEmailStatus = this.emailStatus;
        this.insertBreak(owner);
        var nameContainer = this.createComponent({ kind: "FittableColumns", classes: "nice-padding page-left-justified", owner:this});

        nameContainer.createComponent(
          { name: "name"
            , kind: "onyx.Input"
            , classes:"form-input-box "
            , placeholder: "Name"
            , owner: this
          }
        );
        this.bindDetailData(this.$.name);
        nameContainer.createComponent({content:'', name: "currentName", owner:this});
        this.insertBreak(owner);

        var emailContainer = this.createComponent({ kind: "FittableColumns", classes: "nice-padding page-left-justified", owner:this});

        this.emailRef = emailContainer.createComponent(
          { name: "email"
            , kind: "onyx.Input"
            , classes:"form-input-box"
            , placeholder: "Email"
            , owner: this
            , handlers: {
                onblur: 'emailChanged'
              , onkeyup: 'emailChanged'
            }
            /**
            * When the email changes, check the length, if short remove any indicator classes
            * If longer than 3 characters, check availability, bubble the event up to the PublicController
            */
            , emailChanged: function(inSender, inEvent) {
                if (!this.value || this.value.length < 4) {
                  this.removeClass("text-input-confirm-box");
                  this.removeClass("text-input-error-box");
                } else {
                  mvcApp.waterfall('onCheckEmail', {email:this.value, newEmail:this.value, errorEvent:'onErrorSystemMessages'});
                }
                return true;
            }
          }
        );
        emailContainer.createComponent({content:'', name: "currentEmail", owner:this});

        this.createComponent(
          {kind: "onyx.RadioGroup", name:'roleRadioGroup',  onActivate:"radioActivated", owner: this, style: "margin-left: 11%;margin-top: 10px;", components: [
            {content: "User", name: "userButton", active: true, owner: this},
            {content: "Subscriber", name: "subscriberButton", owner: this},
            {content: "Admin", name: "adminButton", owner: this}
		      ]});
        this.insertBreak(this);

        this.bindDetailData(this.$.email);
        this.createComponent(
          { name: "password"
            , kind: "onyx.Input"
            , classes:"form-input-box"
            , style: "margin-left: 11.2%;"
            , placeholder: "Password"
            , owner: this
          }
        );
        this.bindDetailData(this.$.password);
        this.insertBreak(this);

        this.createComponent(
          { name: "vPassword"
            , kind: "onyx.Input"
            , classes:"form-input-box"
            , style: "margin-left: 11.2%;"
            , placeholder: "Verify Password"
            , owner: this
          }
        );
        this.bindDetailData(this.$.vPassword);
        this.insertBreak(this);

        this.createComponent({ kind: "onyx.Button"
            , content: "Save User Updates"
            , name: "saveUserUpdates"
            , classes: "onyx-blue page-left-justified"
            , style: "margin-top: 30px;"
            , ontap: 'saveUserUpdates'
            , owner:this
        });
        this.createComponent({ kind: "onyx.Button"
            , content: "Delete User"
            , name: "deleteUser"
            , classes: "onyx-blue page-left-justified"
            , style: "margin-top: 30px;"
            , ontap: 'deleteUser'
            , owner:this
        });
        this.createComponent({ kind: "onyx.Button"
            , content: "Clear Form Data"
            , name: "cancel"
            , classes: "onyx-blue page-left-justified"
            , style: "margin-top: 30px;"
            , ontap: 'cancel'
            , owner:this
        });
        owner.render();
      } // end setupPageBody // end setupPageBody
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
        var jsonpGetUserList = new JSONP.GetUserList({owner:this, fireEvent:'onLoadUserDetailList', errorEvent:'onErrorSystemMessages'});
        jsonpGetUserList.makeRequest({username:this.$.usernameSearch.value, email:this.$.emailSearch.value, name:this.$.nameSearch.value, itemsPerPage:-1, pageNumber:'',pages:1, sortField:'', ascendingSortFlag:true});
    }
    , loadUserDetailList: function(inSender, inEvent) {
        var itemArr = [];
        for (var i = 0; i < inEvent.users.length; i++) {
          // admin won't see their own account
          if (inEvent.users[i].username != mvcApp.data.user.username) {
            itemArr.push(inEvent.users[i]);
          }
        }
        this.$.userList.setItems(itemArr);
        return true;
    }
    , userTap: function(inSender, inEvent) {
        var userInfo = inSender.rows[inEvent.index].source;
        // retrieve user details for userInfo._id and load the form
        var ajaxUserDetails = new AJAX.UserDetails({owner:this, fireEvent:'onAdminUserDetailsResult'});
        ajaxUserDetails.makeRequest({id:userInfo._id});

    }
    , adminUserDetailsResult: function(inSender, inEvent) {
        if (inEvent.userdata) {
          mvcApp.adminUserDetails._id = inEvent.userdata._id;
          this.$.currentName.setContent(' Current name: ' + inEvent.userdata.name);
          this.$.currentUsername.setContent(' Current username: ' + inEvent.userdata.username);
          this.$.currentEmail.setContent(' Current email: ' + inEvent.userdata.email);
          if (inEvent.userdata.role == 'User') {
            this.$.userButton.setActive(true);
          } else if (inEvent.userdata.role == 'Subscriber') {
            this.$.subscriberButton.setActive(true);
          } else if (inEvent.userdata.role == 'Admin') {
            this.$.adminButton.setActive(true);
          }
        }
    }
    , bindDetailData: function(bindOwner) {
       bindOwner.setData = function(inSender, inEvent) {
         mvcApp.adminUserDetails[inSender.name] = this.value;
         return true;
       };
       bindOwner.handlers.onblur='setData';
    }
    , usernameStatus: function(inSender, inEvent) {
        // more kludging
        if (inEvent.exists == 'reset') {
          this.usernameRef.removeClass("text-input-confirm-box");
          this.usernameRef.removeClass("text-input-error-box");
        } else {
          if (inEvent.exists == true) {
            this.usernameRef.addClass("text-input-error-box");
          } else {
            this.usernameRef.addClass("text-input-confirm-box");
          }
        }
        return true;
    }
    , emailStatus: function(inSender, inEvent) {
        // more kludging
        if (inEvent.exists == 'reset') {
          this.emailRef.removeClass("text-input-confirm-box");
          this.emailRef.removeClass("text-input-error-box");
        } else {
          if (inEvent.exists == true) {
            this.emailRef.addClass("text-input-error-box");
          } else {
            this.emailRef.addClass("text-input-confirm-box");
          }
        }
        return true;
    }
    , saveUserUpdates: function(inSender, inEvent) {
        var ajaxUserUpdate = new AJAX.AdminUserUpdate({owner:this, fireEvent:'onAdminUserUpdateResult'});

        var data = {id:mvcApp.adminUserDetails._id};
        if (mvcApp.adminUserDetails.name) data.name = mvcApp.adminUserDetails.name;
        if (mvcApp.adminUserDetails.username) data.username = mvcApp.adminUserDetails.username;
        if (mvcApp.adminUserDetails.email) data.email = mvcApp.adminUserDetails.email;
        if (mvcApp.adminUserDetails.password) data.password = mvcApp.adminUserDetails.password;
        if (mvcApp.adminUserDetails.vPassword) data.vPassword = mvcApp.adminUserDetails.vPassword;
        if (mvcApp.adminUserDetails.role) data.role = mvcApp.adminUserDetails.role;

        ajaxUserUpdate.makeRequest(data);
    }
    , deleteUser: function(inSender, inEvent) {
        this.$.confirmationPopup.show();
    }
    , confirmClick: function(inSender, inEvent) {
        var ajaxDelUser = new AJAX.AdminDeleteUser({owner:this, fireEvent:'onUserDeleteResult', errorEvent:'onErrorSystemMessages'});
        ajaxDelUser.makeRequest({id:mvcApp.adminUserDetails._id});
        this.$.confirmationPopup.hide();
    }
    , cancelClick: function(inSender, inEvent) {
        this.$.confirmationPopup.hide();
    }
    , cancel: function(inSender, inEvent) {
        this.clearData();
        this.clearSearch();
    }
    , updateuserInfo: function(inSender, inEvent) {
        // load the user's information
    }
    , adminUserUpdateResult: function(inSender, inEvent) {
        if (inEvent.userdata) {
            var alertTitle = 'Update Successful';
            var alertMessage = 'Your information has been successfully updated.';
            if (inEvent.userdata.newEmail) {
              alertMessage = alertMessage + ' User must verify email account ' + inEvent.userdata.newEmail;
              mvcApp.showWarningMessage("Verify your information", alertMessage);
            } else {
              mvcApp.showInfoMessage(alertTitle, alertMessage);
            }
            this.searchForUser();
            mvcApp.adminUserDetails = {};
            this.$.name.setValue('');
            this.$.username.setValue('');
            this.$.email.setValue('');
            this.$.currentName.setContent('');
            this.$.currentUsername.setContent('');
            this.$.currentEmail.setContent('');
        } else if (inEvent.message) {
            mvcApp.showErrorMessage("Error", inEvent.message);
        }
    }
    , userDeleteResult: function(inSender, inEvent) {
        this.clearData();
        this.searchForUser();
    }
    , clearData: function() {
        mvcApp.adminUserDetails = {};
        this.$.name.setValue('');
        this.$.username.setValue('');
        this.$.email.setValue('');
        this.$.currentName.setContent('');
        this.$.currentUsername.setContent('');
        this.$.currentEmail.setContent('');
    }
    , clearSearch: function() {
        this.$.nameSearch.setValue('');
        this.$.usernameSearch.setValue('');
        this.$.emailSearch.setValue('');
        this.searchForUser();
    }
    ,	ordinals: ["User", "Subscriber", "Admin"]
    ,	radioActivated: function(inSender, inEvent) {
      if (inEvent.originator.getActive()) {
        mvcApp.adminUserDetails.role = inEvent.originator.getContent();
      }
    }
  });
});














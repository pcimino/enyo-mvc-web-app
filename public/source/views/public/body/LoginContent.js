/*
http://forums.enyojs.com/discussion/comment/7103/#Comment_7103

Is it possible to create new bindings dynamically in the view? like doing so:
var bind = new enyo.Binding({from: ".myApplication.controllers.ModelController." + attribute, to: ".$." + attribute + ".content"});
this.bindings.push(bind);


It should be, then you would call this.refreshBindings();

*/
    /*, bindings: [
      { from: ".$.username.value"
        , to: "mvcApp.controllers.publicController.test"
        , kind: "enyo.InputBinding"
      }
      , { from: ".$.password.value"
          , to: "mvcApp.view.$.bodyContainer.owner.controller.data"
          , kind: "enyo.InputBinding"
      }
    ]*/
var aaa= {};
enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.LoginContent"
    , kind: "Bootplate.ParentContent"
    , id: 'loginContent'

    , setupBodyContent: function(owner, renderFlag) {
        owner.createComponent(
            { name: "username"
              , kind: "onyx.Input"
              , classes:"form-input-box form-field-left-margin"
              , placeholder: "Username"
              , owner: owner  // http://jsfiddle.net/pcimino/Cxa2U
              , bindings: []
	//				    , handlers: {
		//				      onblur: 'setData'
			//		    }
					 //   , setData: function (inSender, inEvent) {
                //TODO this shouldn't be necessary, need to figure out how the binding has to be wired up
						//      mvcApp.controllers.publicController.data.username = this.value;
                      //        console.log(mvcApp.view.$.bodyContainer.owner.controller);
                     //         console.log(mvcApp.view.$.bodyContainer.$.username.name);
                     //         console.log(mvcApp.controllers.publicController.data.username.data);
					//	      return true;
					  //  }
            }
        );
        console.log('AAA ' + owner.$.username.bindings);
//      owner.$.username.bindings.push({ from: ".$.username.value"
  //      , to: ".mvcApp.controllers.publicController.test"
    //    , kind: "enyo.InputBinding"
      //                                ,owner: owner.$.username
      //});
      //owner.$.username.bindings[0].refresh();
      /*
var bindOwner = owner.$.username;
      aaa.bo = bindOwner;
//var bind = new enyo.Binding({from: ".$.username.value", to: ".$.password.value", owner: bindOwner});
var bind = new enyo.Binding({from: ".value", to: ".mvcApp.controllers.publicController.data.username", owner: owner.$.username});
bindOwner.bindings.push(bind);
bind.refresh();
      bindOwner.refreshBindings();
      */
var bindOwner = owner.$.username;

      bindOwner.setData = function (inSender, inEvent) {
                //TODO this shouldn't be necessary, need to figure out how the binding has to be wired up
						      mvcApp.controllers.publicController.data.username = this.value;
                    console.log(mvcApp.view.$.bodyContainer.owner.controller);
                              console.log(mvcApp.view.$.bodyContainer.$.username.name);
                             console.log(mvcApp.controllers.publicController.data.username.data);
						      return true;
					    };
        bindOwner.handlers.onblur='setData'  ;
        this.insertBreak(owner);
        owner.createComponent(
            { name: "password",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Password",
              owner: owner
                  , bindings: [
      { from: "$.password.value"
          , to: "$.username.value"
          , kind: "enyo.InputBinding"
      }
    ]
              /*
					    , handlers: {
						      onblur: 'setData'
					    }
					    , setData: function (inSender, inEvent) {
                //TODO this shouldn't be necessary, need to figure out how the binding has to be wired up
						      mvcApp.controllers.publicController.data.pw = this.value;
						      return true;
					    }
                        */
            }
        );
        this.insertBreak(owner);
        owner.createComponent(
            { kind: "onyx.Button",
              content: "Login",
              classes: "onyx-blue form-field-left-margin",
              owner: owner,
              handlers: {
                onclick: 'login'
              },
              login: function () {
                mvcApp.waterfall('onLogin');
                return true;
              }
            }
        );

        this.insertBreak(owner);
        this.insertInternalLink(owner, 'userSignup', 'New User Signup');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'forgotPassword', 'Reset My Password');

      // only call this on navigation, not initial load
        if (renderFlag) owner.render();

        //console.log("BBB " + mvcApp.view.$.bodyContainer.$.password);
//var bind = new enyo.Binding({from: ".mvcApp.publicView.$.bodyContainer.$.password.value", to: ".mvcApp.controllers.publicController.data.username"});
//this.bindings.push(bind);

      } // end setupBodyContent
  });
});
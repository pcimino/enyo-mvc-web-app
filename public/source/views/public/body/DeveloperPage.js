/**
* Display content for showing the user a message on a page. Can be used for displaying an
*   error message or a confirmation messsage
*
* - setupPageBody()
* - setErrorMessage()
* - setConfirmMessage()
*/
var AAA={}
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.DeveloperPage"
    , kind: "Bootplate.ParentPage"
    , id: 'developerPage'
    , authFlag: false
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
        this.findIP();
        this.findWanIP();
    }
    , setupPageBody: function(owner, renderFlag) {
        this.insertFormSpace(owner);

        this.createComponent(
          { content: "This page and navigation button can be disabled in the source by setting:"
            , style: "margin-left: 10%;margin-bottom: 5px;margin-top: 30px;"
            , owner: this
          }
        );
        this.createComponent(
          { content: "mvcApp.showDeveloperTools:false"
           , style: "margin-left: 20%;margin-bottom: 10px;font-weight:bold;font-family:courier;"
            , owner: this
          }
        );

        this.createComponent(
          { content: "Setings on this page will reset if you refresh your browser."
            , style: "margin-left: 10%;margin-bottom: 10px;"
            , owner: this
          }
        );
        this.createComponent(
          { content: "Use this page to test other application settings on the fly. Useful if you deployed as an app and need to connect to a different server address."
            , style: "margin-left: 10%;margin-bottom: 5px;"
            , owner: this
          }
        );

        this.createComponent(
          {kind: "enyo.FittableColumns", style: "margin-left: 10%;margin-bottom: 5px;", owner: this, components: [
            { content: "Server Base URL", style:'width:20%'}
            , { name: "ajaxBaseURL"
              , kind: "onyx.Input"
              , classes:"form-input-box"
              , owner: this
              , placeholder: mvcApp.ajaxBaseURL
            , style:'width:20%'}
          ]});

        this.createComponent(
          {kind: "enyo.FittableColumns", style: "margin-left: 10%;margin-bottom: 5px;", owner: this, components: [
            { content: "Server Port", style:'width:20%'}
            , { name: "ajaxBasePort",
            kind: "onyx.Input",
            classes:"form-input-box",
            placeholder: mvcApp.ajaxBasePort,
            owner: this
          , style:'width:20%'}
          ]}
        );


        this.createComponent(
          {kind: "enyo.FittableColumns", style: "margin-left: 10%;margin-bottom: 5px;", owner: this, components: [
            { content: "Web Socket Base URL", style:'width:20%'}
            , { name: "wsSocketURL"
              , kind: "onyx.Input"
              , classes:"form-input-box"
              , owner: owner  // http://jsfiddle.net/pcimino/Cxa2U
              , placeholder: mvcApp.wsSocketURL
            , style:'width:20%'}
          ]});

        this.createComponent(
          {kind: "enyo.FittableColumns", style: "margin-left: 10%;margin-bottom: 5px;", owner: this, components: [
            { content: "Web Socket Port", style:'width:20%'}
            , { name: "wsSocketPort",
            kind: "onyx.Input",
            classes:"form-input-box",
            placeholder: mvcApp.wsSocketPort,
            owner: this
          , style:'width:20%'}
          ]}
        );

          this.createComponent({ kind: "onyx.Button"
            , content: "Save Changes"
            , name: "saveChanges"
            , classes: "onyx-blue "
            , ontap: 'saveChanges'
            , style: "margin-left:10%; margin-top:20px;"
            , owner: this
        });

        this.createComponent(
          {kind: "enyo.FittableColumns", style: "margin-left: 10%;margin-bottom: 5px;margin-top: 15px;", owner: this, components: [
            { content: "Detected LAN IP:", style:'width:15%'}
            ,{ content: "???", style:'width:15%', owner:this, name:'lanIP'}
            ,{ content: "If this is incorrect try ipconfig or ifconfig in a command prompt.", style:'width:50%'}

          ]}
        );

        this.createComponent(
          {kind: "enyo.FittableColumns", style: "margin-left: 10%;margin-bottom: 5px;", owner: this, components: [
            { content: "Detected WAN IP:", style:'width:15%'}
            , { content: "???", style:'width:15%', owner:this, name:'wanIP'}
            , { content: "If this is incorrect try  "}
            , { tag: 'a'
                , id: 'tag_ip'
                , attributes: {
                    target: '_blank'
                    , href: 'http://api.hostip.info/get_html.php'
                  }
                , content: 'http://api.hostip.info/get_html.php'
               , style:'margin-left:3px;margin-right:3px;'
                , kind: 'enyo.Control'
              }
              , { content: " or similar service."}
          ]}
        );

      // only call this on navigation, not initial load
        if (renderFlag) owner.render();
    } // end setupPageBody
    , saveChanges: function() {
        // could have bound the values but decided against it, prefer to be explicit
        if (this.$.ajaxBaseURL.getValue()) mvcApp.setAjaxBaseURL(this.$.ajaxBaseURL.getValue());
        if (this.$.ajaxBasePort.getValue()) mvcApp.setAjaxBasePort(this.$.ajaxBasePort.getValue());
        if (this.$.wsSocketURL.getValue()) mvcApp.setwWSocketURL(this.$.wsSocketURL.getValue());
        if (this.$.wsSocketPort.getValue()) mvcApp.setwWSocketPort(this.$.wsSocketPort.getValue());

        mvcApp.controllers.authController.logout();
    }
    , findIP: function() {
        var testIP = this.createComponent({name:'testIP'
         , owner:this
         , kind: 'enyo.Ajax'
         , url: 'http://localhost:8888/ping'
         , method:'GET'
         , makeRequest: function() {
             // attach responders to the transaction object
             this.response(this, "processResponse");
             this.error(this, "processError");
             this.go({});
         }
         , processResponse: function(inSender, inResponse) {
             var ip = inSender.xhrResponse.body;
             this.owner.$.lanIP.setContent(JSON.parse(ip).server);
         }
         , processError: function(inSender, inResponse) {

         }
        });

        testIP.makeRequest();
    }
    , findWanIP: function() {
        var testIP = this.createComponent({name:'testIP'
         , owner:this
         , kind: 'enyo.Ajax'
         , url: 'http://api.hostip.info/get_html.php'
         , method:'GET'
         , makeRequest: function() {
             // attach responders to the transaction object
             this.response(this, "processResponse");
             this.error(this, "processError");
             this.go({});
         }
         , processResponse: function(inSender, inResponse) {
             var ip = JSON.stringify(inSender.xhrResponse.body).trim();
             ip = ip.substring(ip.indexOf("IP:")+3, ip.length-3);
             this.owner.$.wanIP.setContent(ip);
         }
         , processError: function(inSender, inResponse) {

         }
        });

        testIP.makeRequest();
    }

  });
});





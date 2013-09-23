// http://macfja.github.io/enyo2-lib/onyx/dynamiclist.html

/**
* This SystemMessageContent kind, restricted to administrators
* used to create system messages which appear on the home page
*
* - setupBodyContent() Impemented method
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.SystemMessageContent"
    , kind: "Bootplate.ParentContent"
    , id: 'systemMessageContent'
    , authFlag: true // used to help determine if user has access to this page
    , published : {
      listRef:''
    }
    , components: [
				{content:'System Messages', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;"}
				, {name: "systemMessageList"
          , kind: "onyx.DynamicList"
          , defaultRowHeight: 50
          , style: "width:80%; margin-left:10%; height: 250px; border: 1px solid grey"
          , onSetupRow: "setupRow"
          , onRowTap:"rowTap"
          , classes:"form-input-box form-top-margin"
        }
    ]
    , setupRow: function(inSender, inEvent) {
        console.log("onSetupRow");
      console.log("onSetupRow", inEvent);
        inEvent.template="<div style=\"border: 2px solid #000; font-size: 20px; padding: 10px;\">{$label}</div>";
        inEvent.template={components: [
          {kind: "onyx.Button", content: "Button : "+inEvent.context.label},
          {content: inEvent.context.label+" : "+new Date()}
        ]};
    }
    , rowTap: function(inSender, inEvent) {
      console.log("onRowTap", inEvent);
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupBodyContent: function(owner) {


        owner.render();

              // populate the list

        for(var b=[],t=0;t<150;t++) {
          b.push({kind:"enyo.Control", label: t+1, owner: this});
        }

        console.log('AAAAAAAAAAAAAAAAAAAAAAAAA')

      console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV')

      this.$.systemMessageList.setItems(b);

    } // end setupBodyContent
  });
});









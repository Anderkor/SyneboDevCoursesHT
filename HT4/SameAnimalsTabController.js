({	
	doinit : function(c) {
        const actions = [
    { label: 'Record Details', name: 'record_details'}
];
		let recId = c.get("v.recordId");
        console.log(recId);
        let returnSame = c.get("c.returnSameAnimals");
        c.set('v.mycolumns', [
            { type: 'action',typeAttributes: {rowActions: actions, menuAlignment: 'auto'}},
            {label: 'Animal name', fieldName: 'Name', type: 'text'},
            {label: 'Description', fieldName: 'Description__c', type: 'text'},
          	{label: 'Eats', fieldName: 'Eats__c', type: 'text'},
            {label: 'Says', fieldName: 'Says__c', type: 'text '}
            ]);
        returnSame.setParams({
            extId: recId
        });

        returnSame.setCallback(this, function (response) {
            console.log('Animals: ',response.getReturnValue());
            c.set("v.animals", response.getReturnValue());
        });

        $A.enqueueAction(returnSame);

	},
    
    clickSearch : function(cmp) {
        const actions = [
    { label: 'Record Details', name: 'record_details'}
];
		let searchKey = cmp.get("v.searchKey");
        let returnSearch = cmp.get("c.searchAnimal");
        cmp.set('v.mycolumns', [
			{type: 'action',typeAttributes: {rowActions: actions, menuAlignment: 'auto'}},
            {label: 'Animal name', fieldName: 'Name', type: 'text'},
            {label: 'Description', fieldName: 'Description__c', type: 'text'},
            {label: 'Eats', fieldName: 'Eats__c', type: 'text'},
            {label: 'Says', fieldName: 'Says__c', type: 'text '}
            ]);
        returnSearch.setParams({
            keyWord: searchKey
        });

        returnSearch.setCallback(this, function (response) {
            console.log('Animals: ',response.getReturnValue());
            cmp.set("v.animals", response.getReturnValue());
        });

        $A.enqueueAction(returnSearch);

	},
    handleRowAction : function(cmp,event,helper){
       var action = event.getParam('action');
       var row = event.getParam('row');
     // navigate to sObject detail page    
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": row.Id,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },

})

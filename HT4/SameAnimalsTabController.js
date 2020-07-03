({
	doinit : function(c) {
		let recId = c.get("v.recordId");
        console.log(recId);
        let returnSame = c.get("c.returnSameAnimals");
        c.set('v.mycolumns', [
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

	}
})

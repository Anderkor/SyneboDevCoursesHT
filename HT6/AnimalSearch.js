import { LightningElement, track } from 'lwc';
import getAnimals from '@salesforce/apex/AnimalSearchController.animalSearch';

const columns=[
    {label:"Heroku Id", fieldName:"Heroku_Id__c", type:"integer"},
    {label: 'Description', fieldName: 'Description__c', type: 'text'},
    {label: 'Eats', fieldName: 'Eats__c', type: 'text'},
  {label: 'Says', fieldName: 'Says__c', type: 'text '}
];




export default class AnimalSearch extends LightningElement {
    @track searchItems;
    @track errorMsg;
    @track idsInputList = [];
    animals=[];
    columns = columns;
    handleItemChange(e){
        this.searchItems = e.target.value;
    }
    searchClick() {
        this.idsInputList = this.searchItems.split(',');
        getAnimals({herokuIdList: this.idsInputList})
        .then(result =>{
            this.animals = result;
        })
        .catch(error =>{
            this.errorMsg = error;
        })
    }
}
    

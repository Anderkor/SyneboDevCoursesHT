public class AnimalSearchController{
    @AuraEnabled
    public static List<Animal__c> animalSearch(Integer[] herokuIdList){
        if(herokuIdList.isEmpty()){
            return null;
        }
        List<Animal__C> result = new List<Animal__C>();
        Set<Integer> herokuIdSet = new Set<Integer>(herokuIdList);
        for(Integer n:herokuIdSet){
            Animal__c animalItem;
            try{
                animalItem = [SELECT Heroku_Id__c, Description__c,Says__c,Eats__c FROM Animal__C WHERE Heroku_Id__c = :n LIMIT 1];
            }catch(Exception e){
                AnimalModel animalModelItem = getAnimalModel(n);
                animalItem = new Animal__c(Heroku_Id__c = n, Description__c = animalModelItem.name,Says__c = animalModelItem.says,Eats__c = animalModelItem.eats);
            }
            if(animalItem!=null){
                result.add(animalItem);
            }
        }     
        return result;
    }

    private static AnimalModel getAnimalModel(Integer herokuId){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/' + herokuId);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            Map<String, AnimalModel> resultedAnimalMap = (Map<String, AnimalModel>)JSON.deserialize(response.getBody(),Map<String, AnimalModel>.class);
            AnimalModel animalItem = resultedAnimalMap.get('animal');
            return animalItem;
        }
        return null;
    }
}

DynamicCollections = []; 

var addDynamicCollection = function(collectionName) {
  //TODO Add Check for existence
  DynamicCollections[collectionName] = new Mongo.Collection('dynamic_' + collectionName); 
  

}; 


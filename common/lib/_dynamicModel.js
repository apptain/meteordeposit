DynamicCollections = []; 

Dynamic = {}; 

Dynamic.addDynamicCollection = function(collectionName) {
  //TODO Add Check for existence
  DynamicCollections[collectionName] = new Mongo.Collection('dynamic_' + collectionName); 
  DynamicCollections[collectionName].allow({
    insert: function (userId, post) {
        return CurrentProcessMode === ProcessMode.Dev;
    },
    update: function (userId) {
        return CurrentProcessMode === ProcessMode.Dev;
    },
    remove: function (userId) {
        return CurrentProcessMode === ProcessMode.Dev;
    },
    fetch: []
  });
  return DynamicCollections[collectionName]; 

}; 


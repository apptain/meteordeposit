ContentStacker = {}; 

Schemas = {}; 

Meteor.isClient && Template.registerHelper("Schemas", Schemas);

Types = new Mongo.Collection('ContentStacker.Types'); 

var contentDefinition = {
  type: Match.Optional(ContentType) 
}; 

ContentStacker.Type = function(schemas, options){
  var self = this; 
  options = options || {}; 
  schemas = schemas || {};

  if (!_.isArray(schemas)) {
    schemas = [schemas];
  }

  self._schema = mergeSchemas(schemas);
  Types.insert(self._schema);
}

var mergeSchemas = function(schemas) {
  var mergedSchema = {};
  _.each(schemas, function(schema) {

   if (Match.test(schema, SimpleSchema)) {
      schema = schema._schema;
    } else {
      console.log('Not content defenition');
    }
    // Loop through and extend each individual field
    // definition. That way you can extend and overwrite
    // base field definitions.
    _.each(schema, function(def, field) {
      mergedSchema[field] = mergedSchema[field] || {};
      _.extend(mergedSchema[field], def);
    });

  });

  // If we merged some schemas, do this again to make sure
  // extended definitions are pushed into array item field
  // definitions properly.
  schemas.length && adjustArrayFields(mergedSchema);

  return mergedSchema;
};

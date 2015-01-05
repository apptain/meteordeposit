Meteor.publish('content', function () {
 // if(CurrentProcessMode === ProcessMode.Dev){
    return Content.find();
  // } else {
  //   return []; 
  // }
});

Meteor.publish('siteContent', function () {
  var domain = process.env.ROOT_URL; 
  var siteName = Sites.findOne({domain: domain}).name; 
  //return Content.find({ $or: [{site: siteName}, {site : 'all'}] });
  return Content.find({}); 
});

Meteor.publish('contentTypes', function () {
  return ContentTypes.find();
});

Meteor.publish('sites', function () {
  return Sites.find();
});

Meteor.publish('sitePages', function () {
  var domain = process.env.ROOT_URL; 
  var siteName = Sites.findOne({domain: domain}).name; 
  return Pages.find({ site : siteName }); 
});

Meteor.publish('sitePortfolio', function () {
  var domain = process.env.ROOT_URL; 
  var siteName = Sites.findOne({domain: domain}).name; 
  return Content.find({site: siteName, contentType: 'Portfolio'}); 
}); 

// Updates are only allowed in local dev. Until a security infrastructure can be built, the database can be deployed
 Content.allow({
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
//
// ContentTypes.allow({
//     insert: function (userId, post) {
//         return CurrentProcessMode === ProcessMode.Dev;
//     },
//     update: function (userId) {
//         return CurrentProcessMode === ProcessMode.Dev;
//     },
//     remove: function (userId) {
//         return CurrentProcessMode === ProcessMode.Dev;
//     },
//     fetch: []
// });
//
// Sites.allow({
//     insert: function (userId, site) {
//         return CurrentProcessMode === ProcessMode.Dev;
//     },
//     update: function (userId) {
//         return CurrentProcessMode === ProcessMode.Dev;
//     },
//     remove: function (userId) {
//         return CurrentProcessMode === ProcessMode.Dev;
//     },
//     fetch: []
// });
//
// Pages.allow({
//     insert: function (userId, pages) {
//         return CurrentProcessMode === ProcessMode.Dev;
//     },
//     update: function (userId) {
//         return CurrentProcessMode === ProcessMode.Dev;
//     },
//     remove: function (userId) {
//         return CurrentProcessMode === ProcessMode.Dev;
//     },
//     fetch: []
// });
//

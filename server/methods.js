Meteor.methods({
  sitePages: function () {
    var domain = process.env.ROOT_URL; 
    var site = Sites.findOne({ domain: domain}); 
    var SitePages = Pages.find({}).fetch();
    return SitePages; 
  }, 
  updatesAllowedCheck: function () {
    if (CurrentProcessMode == ProcessMode.Dev) {
        return true; 
    } else {
        return false;
    }
  }, 
  getSiteMeta: function () {
    var domain = process.env.ROOT_URL; 
    var site = Sites.findOne({ domain: domain}); 
    return site; 
  }, 
  
})


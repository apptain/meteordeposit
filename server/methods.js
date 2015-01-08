Meteor.methods({
  sitePages: function () {
    var domain = process.env.ROOT_URL; 
    var site = Sites.findOne({ domain: domain}); 
    var SitePages = Pages.find({}).fetch();
    debugger;
    var SpacebarsCompiler = Package['spacebars-compiler'].SpacebarsCompiler;
    var codeGen = SpacebarsCompiler.codeGen;
    console.log(codeGen); 
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
    if(site)
      return site; 
    return domain;
  }, 
  
})


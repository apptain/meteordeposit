Meteor.methods({
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
  }
})


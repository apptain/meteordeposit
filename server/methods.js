Meteor.methods({
    updatesAllowedCheck: function () {
        if (CurrentProcessMode == ProcessMode.Dev) {
            return true; 
        } else {
            return false;
        }
  }
})


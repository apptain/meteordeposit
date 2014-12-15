Iron.Router.plugins.authorize = function(router, options){
  router.onBeforeAction(function () {
    Meteor.call('updatesAllowedCheck', function (error, result) {
      if (error) {
        //TODO Add logging
        debugger;
      } else {
        if (result === false) {
            Iron.Location.go(Router.routes['home']._path);                   
        }
      }
    });
    this.next();
  }, options);
}; 



AdminController = RouteController.extend({
    onBeforeAction: function () {
        this.next();
    },
    waitOn: function () {
        return [Meteor.subscribe('posts'), Meteor.subscribe('sites')];
    },
    data: {
      posts: function () {
          return Posts.find({});
      }, 
      sites: function () {
          return Sites.find({});
      }
    }
});

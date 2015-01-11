AdminController = RouteController.extend({
  layoutTemplate: 'adminLayout', 
  onBeforeAction: function () {
      this.next();
  },
  waitOn: function () {
      return [Meteor.subscribe('content'), Meteor.subscribe('sites')];
  },
  data: {
    content: function () {
        return Content.find({});
    }, 
    sites: function () {
        return Sites.find({});
    }
  }
});

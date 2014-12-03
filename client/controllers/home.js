HomeController = RouteController.extend({
  template: 'index',
  waitOn: function(){
   return Meteor.subscribe("posts");
  }, 
  data:{
    post: function(){
      return Posts.findOne();
    }
  }
})

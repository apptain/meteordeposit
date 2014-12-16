HomeController = RouteController.extend({
  template: 'index',
  waitOn: function(){
   return Meteor.subscribe("siteContent");
  }, 
  data:{
    post: function(){
      return Content.findOne();
    }, 
    content: function(){
      return Content.find({});
    }
  }
})

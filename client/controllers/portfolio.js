PortfolioController = RouteController.extend({
  template: 'portfolio.list',
  waitOn: function(){
   return Meteor.subscribe("sitePortfolio");
  }, 
  data:{
    portfolio: function(){
      return Content.find({});
    }
  }
})

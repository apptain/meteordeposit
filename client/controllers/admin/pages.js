PagesController = RouteController.extend({
  template: 'pagesList', 
  waitOn: function(){
    return [Meteor.subscribe('sitePages')]; 
  },
  data: {
    pages: function () {
      return Pages.find({}); 
    } 
  }, 
  action: function() {
    this.render();   
  }
});

Template.pagesList.rendered = function () {
  var pages = Pages.find({}).fetch();
  var dataSource = new kendo.data.HierarchicalDataSource({
      data: pages, 
      schema: {
        model: {
          children: "childPages"
        }
      }
  });

  $("#pagesTreeview").kendoTreeView({
      dataSource: dataSource,
      dataTextField: "name"
  });  
}

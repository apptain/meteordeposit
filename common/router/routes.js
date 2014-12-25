LegionRouter.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

var DynamicControllers = [];

var addPageRoute = function (router, page) {
  
  DynamicControllers[page.route] = RouteController.extend({});
      Template.__define__(page.route, function(){
      return '<h1>Hello Test!</h1>' 
    });
  UI.render(Template[page.route]); 
  router.route(page.route, { path: page.pageUrl }); 
  
}



LegionRouter.map(function () {
  debugger;
  this.route('home', { path: '/' });
  this.route('admin', { path: '/admin' });
  this.route('content.create', { path: '/content/create' });
  this.route('content.edit', { path: '/content/edit/:_slug' });
  this.route('site.create', { path: '/site/create' });
  this.route('site.edit', { path: '/site/edit/:_name' });
  this.route('pages', {path: '/pages' });

var router = this;

var page = {
  route: 'testMe', 
  pageUrl: '/testme'
}
var DynamicControllers = [];

if(Meteor.isClient){
  addPageRoute(router, page);
}
   if (Meteor.isClient) {
     var tPages = Session.get('pages');
     
     Tracker.autorun(function (computation) {
     if(Session.get('pages')){
           
        _.each(Session.get('pages'), function(page){
           addPageRoute(router, page); 
         });
         Session.set('allPagesSet', true); 
     }}); 
     if(typeof(Session.get('pages') === undefined)) {
        
             Meteor.subscribe("sitePages", {
       onReady: function () { 
          
         var pages = Pages.find({}).fetch()
         Session.set('pages', pages); 
         console.log("onReady", arguments); },
       onError: function () { console.log("onError", arguments); }
     });

     } 
   //   Deps.autorun(function () {
   //   Meteor.subscribe("sitePages", {
   //     onReady: function (t) { var DynamicControllers = [];
   //
   //
   //       
   //      var pages = Pages.find({}).fetch(); 
   //                _.each(pages, function(page){
   //           addPageRoute(router, page); 
   //         });  
   //
   //       console.log("onReady", arguments); },
   //     onError: function () { console.log("onError", arguments); }
   //   });
   // }); 
   //
   }
  
});



if (Meteor.isServer) {

       var pages = Pages.find({}).fetch(); 

}



LegionRouter.plugin('authorize', {
  only: ['admin', 'site.create', 'site.edit']
});

var siteMeta; 

LegionRouter.waitOn(function () {
  siteMeta = Session.get('siteMeta'); 
  if (!siteMeta){
    Meteor.call('getSiteMeta', function (error, result) {
      if (error) {
        
      } else {
        Session.set('siteMeta', result);
        return;    
      }
    });
  } else {
    return; 
  } 
});

LegionRouter.onAfterAction(function () {
  if(typeof(siteMeta) != 'undefined'){

    document.title = siteMeta.title;      
    
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '/' + siteMeta.favico;
    document.head.appendChild(link);

    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = siteMeta.css;
    } else {
      style.appendChild(document.createTextNode(siteMeta.css));
    }
    document.head.appendChild(style)
    
    var script = document.createElement('script');
    script.text = siteMeta.analyticsCode.replace('<script>', '').replace('</script>', '');
    document.head.appendChild(script); 
  } 
});

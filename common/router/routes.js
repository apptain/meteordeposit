Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

Router.options.autoStart = false;

var DynamicControllers = [];


var addPageRoute = function (router, page) {
  
  window[page.route + 'Controller'] = RouteController.extend({
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
  });

  //https://meteorhacks.com/how-blaze-works.html
  debugger;
  Template[page.route] = new Template('Template.' + page.route, ( function(){
     var view = this;
     return [ Blaze._TemplateWith(function() {
     return "secondary";
       }, function() {
     return Spacebars.include(view.lookupTemplate("contentFor"), function() {
       return [ "\n    ", HTML.H1("I'm Secondary Content"), "\n  " ];
     });
     }), "\n  ", Spacebars.include(view.lookupTemplate("postList")) ];
   }));  

  //   return [ 
  //       // {{#contentFor "secondary"}}
  //       //  <h1>I'm Secondary Content</h1>
  //       // {{/contentFor}}
  //     HTML.Raw("<h1>Post List</h1>\n  "),
  //     Spacebars.include(this.lookupTemplate("postList")) ]; 
  // }));
  
  // Template.__define__(page.route, function(){
  //   var view = this;
  //   return [ Blaze._TemplateWith(function() {
  //   return "secondary";
  //     }, function() {
  //   return Spacebars.include(view.lookupTemplate("contentFor"), function() {
  //     return [ "\n    ", HTML.H1("I'm Secondary Content"), "\n  " ];
  //   });
  //   }), "\n  ", Spacebars.include(view.lookupTemplate("postList")) ];
  // });  
  //Blaze.render(Template[page.route], document.body); 
  //Blaze.render(Template[page.route], document.body); 
  router.route(page.route, { path: page.pageUrl }); 
  
  router.start(); 
  //invalidate Router._locationComputation by updating currentController
  
  //Router._locationComputation._func = locationFunction; 
  //Router._currentController = null;
  //Router._locationComputation.invalidate(); 
 
        //Router.allRoutesLoaded = true;
        //console.log('page added for ' + page.pageUrl); 
 
}

debugger;
//var locationFunction = Router._locationComputation._func; 
//Router._locationComputation._func = function() {}; 

Router.map(function () {

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
  site: 'dev', 
  route: 'testMe', 
  pageUrl: '/testme'
}
var DynamicControllers = [];

// if(Meteor.isClient){
//   addPageRoute(router, page);
// }
   if (Meteor.isClient) {
      Meteor.call('sitePages', function (error, result) {
      if (error) {
        debugger;
      } else {
         _.each(result, function(page){
           addPageRoute(router, page); 
         debugger;
        });  
      }
    });
}

     // var tPages = Session.get('pages');
     //
     // Tracker.autorun(function (computation) {
     // if(Session.get('pages')){
     //       
     //    _.each(Session.get('pages'), function(page){
     //       addPageRoute(router, page); 
     //   Session.set('siteMeta', result);
     //   return;    
     //     });
     //     Session.set('allPagesSet', true); 
     // }}); 
     // if(typeof(Session.get('pages') === undefined)) {
     //    
     //         Meteor.subscribe("sitePages", {
     //   onReady: function () { 
     //      
     //     var pages = Pages.find({}).fetch()
     //     Session.set('pages', pages); 
     //     console.log("onReady", arguments); },
     //   onError: function () { console.log("onError", arguments); }
     // });

   //  } 
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
  
});



if (Meteor.isServer) {

       var pages = Pages.find({}).fetch(); 

}



Router.plugin('authorize', {
  only: ['admin', 'site.create', 'site.edit']
});

var siteMeta; 

Router.waitOn(function () {
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

Router.onAfterAction(function () {
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

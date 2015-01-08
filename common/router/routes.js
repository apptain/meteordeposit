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
     return Meteor.subscribe("content");
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

  router.route(page.route, { path: page.pageUrl }); 
  router.start(); 
}

Router.map(function () {
  this.route('home', { path: '/home' });
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

   if (Meteor.isClient) {
      Meteor.call('sitePages', function (error, result) {
      if (error) {
        
      } else {
         _.each(result, function(page){
           addPageRoute(router, page); 
         
        });  
      }
    });
}

});

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
        console.log(result); 
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

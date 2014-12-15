Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function () {
  this.route('home', { path: '/' });
  this.route('admin', { path: '/admin' });
  this.route('post.createDev', { path: '/post/create' });
  this.route('post.editDev', { path: '/post/edit/:_slug' });
  this.route('site.create', { path: '/site/create' });
  this.route('site.edit', { path: '/site/edit/:_name' });
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
        debugger;
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

Package.describe({
  summary: 'Inherits Iron:Router and adds multi-site and dynamic page routes', 
  version: '0.0.1'
}); 

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.2');
  // meteor dependencies
  api.use('underscore');
  api.use('webapp', 'server');
  api.use('deps', 'client');
  api.use('ui');
  api.use('templating');

  // for cloning
  api.use('ejson');

  // for dynamic scoping with environment variables
  api.use('meteor')

  api.use('iron:router@1.0.3'); 
  api.use('iron:core@1.0.3');
  api.imply('iron:core');
  api.use('iron:layout@1.0.3');
  api.use('iron:middleware-stack@1.0.3');
  api.use('iron:url@1.0.3');
  api.use('iron:location@1.0.3');
  api.use('iron:controller@1.0.3');

  
  api.add_files('lib/utils.js'); 
  //api.add_files('lib/legion_route.js'); 
  api.add_files('lib/legion_router.js'); 

  //exports
  api.export('LegionRouter'); 
});



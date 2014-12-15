ServerController = RouteController.extend({
   get: function () {
    console.log('hit'); 
    this.response.end('hello server\n');
   }
});

debugger;
Router.route('server', {name: 'server', where: 'server', domain: 'apptain.com'});




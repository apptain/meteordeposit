LegionRouter = {}; 
LegionRouter.__proto__ = Router;

var MiddlewareStack = Iron.MiddlewareStack;
var Url = Iron.Url;
var Layout = Iron.Layout;
var warn = Iron.utils.warn;
var assert = Iron.utils.assert;

//Currently a client side only implementation
if(Meteor.isClient) {
  this.allRoutesLoaded = false;

  //#region override start
  LegionRouter.__proto__.start = function () {
    debugger;
    var self = this;
    var prevLocation;

    self._locationComputation = Deps.autorun(function locationComputation (c) {
      debugger;
      var controller;
      var loc = Iron.Location.get();
      var hash, pathname, search;
      var current = self._currentController;

      if (!current || (prevLocation && prevLocation.path !== loc.path)) {
        controller = self.dispatch(loc.href);

        // if we're going to the server cancel the url change
        if (controller.willBeHandledOnServer())
          loc.cancelUrlChange();
      } else {
        self._scrollToHash(loc.hash);
        // either the query or hash has changed so configure the current
        // controller again.
        current.configureFromUrl(loc.href);
      }

      prevLocation = loc;
    });
  };
  //#endregion

  //#region override route
    //XXX seems like we could put a params method on the route directly and make it reactive
  LegionRouter.prototype.route = function (path, fn, opts) {
    var typeOf = function (val) { return Object.prototype.toString.call(val); };
    assert(typeOf(path) === '[object String]' || typeOf(path) === '[object RegExp]', "Router.route requires a path that is a string or regular expression.");

    if (typeof fn === 'object') {
      opts = fn;
      fn = opts.action;
    }

    debugger;
    var route = new LegionRoute(path, fn, opts);

    opts = opts || {};

    // don't mount the route
    opts.mount = false;

    // stack expects a function which is exactly what a new Route returns!
    var handler = this._stack.push(path, route, opts);

    handler.route = route;
    route.handler = handler;
    route.router = this;
    
    assert(!this.routes._byPath[handler.path],
      "A route for the path " + JSON.stringify(handler.path) + " already exists by the name of " + JSON.stringify(handler.name) + ".");
    this.routes._byPath[handler.path] = route;

    this.routes.push(route);

    if (typeof handler.name === 'string')
      this.routes[handler.name] = route;

    return route;
  };
  //#endregion

  //#region override createController from router
  LegionRouter.__proto__.createController = function (url, context) {
    debugger;
    // see if there's a route for this url
    var route = this.findFirstRoute(url);
    var controller;

    context = context || {};

    if (route)
      // let the route decide what controller to use
      controller = route.createController({layout: this._layout});
    else
      // create an anonymous controller
      controller = new RouteController({layout: this._layout});

    controller.router = this;
    controller.configureFromUrl(url, context, {reactive: false});
    return controller;
  };
  //#endregion

  //#region override dispatch from router_client
  LegionRouter.__proto__.dispatch = function (url, context, done) {
    var self = this;
 
    assert(typeof url === 'string', "expected url string in router dispatch");
    
    var controller = this._currentController;
    var route = this.findFirstRoute(url);
    var prevRoute = this._currentRoute;

    this._currentRoute = route;

    debugger;
    //XXX Instead of this, let's consider making all RouteControllers
    //    singletons that get configured at dispatch. Will revisit this
    //    after v1.0.
    if (controller && route && prevRoute === route) {
      // this will change the parameters dep so anywhere you call
      // this.getParams will rerun if the parameters have changed
      controller.configureFromUrl(url, context);
    } else {
      // Looks like we're on a new route so we'll create a new
      // controller from scratch.
      controller = this.createController(url, context);
    }

    // even if we already have an existing controller we'll stop it
    // and start it again. But since the actual controller instance
    // hasn't changed, the helpers won't need to rerun.
    if (this._currentController)
      this._currentController.stop();

    this._currentController = controller;
    debugger;
    controller.dispatch(self._stack, url, function (err) {
      if (err)
        throw err;
      else {
        if (!controller.isHandled()) {
          // if we aren't at the initial state, we haven't yet given the server
          // a true chance to handle this URL, so we better try
          // if the server CAN'T handle the router, we'll be back, but as initial
          var state = controller.location.get().options.historyState;
          if (controller.willBeHandledOnServer() || !(state && state.initial)) {
            window.location = controller.url;
            return; 
          }
          
          // looks like there's no handlers so let's give a default
          // not found message! Use the layout defined in global config
          // if we have one.
          //
          // NOTE: this => controller
          this.layout(this.lookupOption('layoutTemplate'), {data: {url: this.url}});

          var notFoundTemplate = this.lookupOption('notFoundTemplate');

          if (!notFoundTemplate)
            notFoundTemplate = (self.routes.length === 0) ? NO_ROUTES_TEMPLATE : DEFAULT_NOT_FOUND_TEMPLATE;
          this.render(notFoundTemplate, {data: {url: this.url}});
          this.renderRegions();
          return;
        } else {
          return done && done(err);
        }
      }
    });

    // Note: even if the controller didn't actually change I change the
    // currentDep since if we did a dispatch, the url changed and that
    // means either we have a new controller OR the parameters for an
    // existing controller have changed.
    if (this._currentController == controller)
      this._currentDep.changed();

    return controller;
  };
  //#endregion
  
  //#region override createController from router
  LegionRouter.prototype.createController = function (url, context) {
    // see if there's a route for this url
    var route = this.findFirstRoute(url);
    var controller;

    context = context || {};

    if (route)
      // let the route decide what controller to use
      controller = route.createController({layout: this._layout});
    else
      // create an anonymous controller
      controller = new RouteController({layout: this._layout});

    controller.router = this;
    controller.configureFromUrl(url, context, {reactive: false});
    return controller;
  };
  //#endregion
  //#region override findFirstRoute
  LegionRouter.__proto__.findFirstRoute = function (url) {
   debugger;
   var domain = Url.parse(url).rootUrl + '/'; 
   for (var i = 0; i < this.routes.length; i++) {
    if (this.routes[i].handler.test(url, {}))
      return this.routes[i];
    }

    return null;
  }
  //#endregion


}

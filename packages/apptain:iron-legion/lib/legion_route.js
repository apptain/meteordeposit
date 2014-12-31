LegionRoute = {}; 
LegionRoute.__proto__ = Route;

var Url = Iron.Url;
var MiddlewareStack = Iron.MiddlewareStack;
var assert = Iron.utils.assert;

//Currently a client side only implementation
if(Meteor.isClient) {
//#region override createController
LegionRoute.prototype.createController = function (options) {
   options = options || {};
  var C = this.findControllerConstructor();
  options.route = this;
  var instance = new C(options);
  return instance;
};
//#endregion

//#region override findControllerConstructor
LegionRoute.prototype.findControllerConstructor = function () {
  var self = this;

  var resolve = function (name, opts) {
    debugger;
    opts = opts || {};
    var C = Iron.utils.resolve(name);
    if (!C || !RouteController.prototype.isPrototypeOf(C.prototype)) {
      if (opts.supressErrors !== true)
        throw new Error("RouteController '" + name + "' is not defined.");
      else
        return undefined;
    } else {
      return C;
    }
  };

  var convert = function (name) {
    return self.router.toControllerName(name);
  };

  var result;
  var name = this.getName();

  // the controller was set directly
  if (typeof this.options.controller === 'function')
    return this.options.controller;

  // was the controller specified precisely by name? then resolve to an actual
  // javascript constructor value
  else if (typeof this.options.controller === 'string')
    return resolve(this.options.controller);

  // otherwise do we have a name? try to convert the name to a controller name
  // and resolve it to a value
  else if (name && (result = resolve(convert(name), {supressErrors: true})))
    return result;

  // otherwise just use an anonymous route controller
  else
    return RouteController;
};
//#endregion
}



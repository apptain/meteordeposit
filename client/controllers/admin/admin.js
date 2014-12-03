AdminController = RouteController.extend({
    onBeforeAction: function () {
        this.next();
    },
    waitOn: function () {
        return Meteor.subscribe("posts");
    },
    data: {
        posts: function () {
            return Posts.find({});
        }
    }
});

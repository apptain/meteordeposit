Meteor.publish('posts', function () {
    return Posts.find();
});

 Meteor.publish('postTypes', function () {
    return PostTypes.find();
});

// Updates are only allowed in local dev. Until a security infrastructure can be built, the database can be deployed
Posts.allow({
    insert: function (userId, post) {
        return CurrentProcessMode === ProcessMode.Dev;
    },
    update: function (userId) {
        return CurrentProcessMode === ProcessMode.Dev;
    },
    remove: function (userId) {
        return CurrentProcessMode === ProcessMode.Dev;
    },
    fetch: []
});

PostTypes.allow({
    insert: function (userId, post) {
        return CurrentProcessMode === ProcessMode.Dev;
    },
    update: function (userId) {
        return CurrentProcessMode === ProcessMode.Dev;
    },
    remove: function (userId) {
        return CurrentProcessMode === ProcessMode.Dev;
    },
    fetch: []
});

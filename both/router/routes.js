Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound',
    templateNameConverter: 'upperCamelCase',
    routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function () {
    this.route('home', {path: '/'});
    this.route('admin', { path: '/admin' });
    this.route('post.create', { path: '/post/create' });
    this.route('post.edit', { path: '/post/edit/:_slug' });
});

Router.plugin('authorize', {
    only: ['admin', 'post.create', 'post.edit']
});

Router.onAfterAction(function() {
        document.title = Config.DefaultTitle;
    }
);
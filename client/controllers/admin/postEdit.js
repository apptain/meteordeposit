var selectedPost;

PostEditController = RouteController.extend({
  waitOn: function(){
    return [Meteor.subscribe('postTypes'), Meteor.subscribe('posts')]; 
  },
  data: {
    selectedPost: function(){
      return selectedPost; 
    },  
     postTypes: function(){
      return PostTypes.find({});
    }
  }, 
  action: function() {
    if(this.params._slug){
        selectedPost = Posts.findOne({slug: this.params._slug}); 
    }
    else {
        selectedPost = {
            title: '', 
            body: '', 
            type: ''
        }
      }  
    this.render(); 
  }
});

PostCreateController = PostEditController.extend({
    template: 'postCreate' 
});

Template.postForm.events({
    'submit form': function(e, template) {
        e.preventDefault();
        var changes = readPostForm(template);
        if(changes.title === '' || changes.body === ''){
            alert('Title and Body required');
            return;
        }
        if(this._id){
            Posts.update(this._id, {$set: changes}, function(error, result){
                if(error){
                    alert(error);
                } else {
                    Iron.Location.go(Router.routes['admin']._path);
                }
            });
        } else {
            Posts.insert(changes, function(error, result){
                if(error){
                    alert(error);
                } else {
                    Iron.Location.go(Router.routes['admin']._path);
                }
            });
        }
    },
    'click .delete': function() {
        if (confirm('Are you sure you want to delete "' + this.title + '"?'))
            Posts.remove(this._id)
    }
})

var readPostForm = function(template) {
    var post = {};
    post.title = template.find('[name=title]').value;
    //TODO disable slug changing for SEO and validate slug isn't already used
    post.slug = titleToSlug(template.find('[name=title]').value);
    post.body = template.find('[name=body]').value;
    post.type = template.find('[name=postType]').value;

    return post;
}

Template.postForm.helpers({
  postTypes: function(){
    return PostTypes.find({});          
  },
  postTypeCheck: function(post){
    return post && this.name == post.type ? 'selected': '';
  }
})

Template.postForm.rendered = function(){
    $('[name=body]').htmlarea();
}

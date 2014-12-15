var selectedPost;

PostEditController = RouteController.extend({
  waitOn: function(){
    return [Meteor.subscribe('sites'), Meteor.subscribe('postTypes'), Meteor.subscribe('posts')]; 
  },
  data: {
    selectedPost: function(){
      return selectedPost; 
    },  
    postTypes: function(){
      return PostTypes.find({});
    },
    sites: function () {
      return Sites.find({}); 
    }
  }, 
  action: function() {
    if(this.params._slug){
      selectedPost = Posts.findOne({ slug: this.params._slug });
    }
    else {
      //just read the form to assign black values
      selectedPost = objectFromForm(Template.postForm);
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
        var changes = objectFromForm(template);
        changes.slug = titleToSlug(changes.title);  
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

Template.postForm.helpers({
  postTypes: function (){
    return PostTypes.find({});          
  },
  sites: function () {
    return Sites.find({}); 
  }, 
  postTypeCheck: function(post){
    return post && this.name == post.type ? 'selected': '';
  }, 
  siteCheck: function(post){
    return post && this.name == post.site ? 'selected': '';
  }
})

Template.postForm.rendered = function () {
    $('[name=body]').htmlarea();
}

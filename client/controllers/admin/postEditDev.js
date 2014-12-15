var selectedPostDev;

PostEditDevController = RouteController.extend({
  waitOn: function(){
    return [Meteor.subscribe('sites'), Meteor.subscribe('postTypes'), Meteor.subscribe('posts')]; 
  },
  data: {
    selectedPostDev: function(){
      return selectedPostDev; 
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
      selectedPostDev = Posts.findOne({ slug: this.params._slug });
    }
    else {
      //just read the form to assign black values
      selectedPostDev = objectFromForm(Template.postForm);
    }
    this.render(); 
  }
});

PostCreateDevController = PostEditController.extend({
    template: 'postCreateDev' 
});

Template.postFormDev.events({
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

Template.postFormDev.helpers({
  formFields: function () {
  var a = selectedPostDev; 
  var fields = [];  
  for (var name in selectedPostDev)
  {
    if(name != '_id' && selectedPostDev.hasOwnProperty(name)){
    var field={
      templateName: 'textBox', 
      name: name, 
      value: selectedPostDev[name] 
    }
    var t = selectedPostDev[name]; 
    fields.push(field); 
    }
  }
    return fields; 
  }
})

Template.postForm.rendered = function () {
    $('[name=body]').htmlarea();
}


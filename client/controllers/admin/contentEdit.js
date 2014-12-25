var selectedContent;

debugger;
ContentEditController = RouteController.extend({
  waitOn: function(){
    return [Meteor.subscribe('sites'), Meteor.subscribe('contentTypes'), Meteor.subscribe('content')]; 
  },
  data: {
    selectedContent: function(){
      return selectedContent; 
    },  
    contentTypes: function(){
      return ContentTypes.find({});
    },
    sites: function () {
      return Sites.find({}); 
    }
  }, 
  action: function() {
    if(this.params._slug){
      selectedContent = Content.findOne({ slug: this.params._slug });
    }
    else {
      //just read the form to assign black values
      selectedContent = objectFromForm(Template.contentForm);
    }
    this.render(); 
  }
});

ContentCreateController = ContentEditController.extend({
    template: 'contentCreate' 
});

Template.contentForm.events({
    'submit form': function(e, template) {
        e.preventDefault();
        debugger;
        var changes = objectFromForm(template);
        changes.slug = titleToSlug(changes.title);  
        if(changes.title === '' || changes.body === ''){
            alert('Title and Body required');
            return;
        }
        if(this._id){
            Content.update(this._id, {$set: changes}, function(error, result){
                if(error){
                    alert(error);
                } else {
                    Iron.Location.go(Router.routes['admin']._path);
                }
            });
        } else {
            Content.insert(changes, function(error, result){
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
            Content.remove(this._id)
    }
})

Template.contentForm.helpers({
  contentTypes: function (){
    return ContentTypes.find({});          
  },
  sites: function () {
    return Sites.find({}); 
  }, 
  contentTypeCheck: function(content){
    return content && this.name == content.type ? 'selected': '';
  }, 
  siteCheck: function(content){
    return content && this.name == content.site ? 'selected': '';
  }
})

Template.contentForm.rendered = function () {
    $('[name=body]').htmlarea();
}

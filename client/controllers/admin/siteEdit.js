var selectedSite;

SiteEditController = RouteController.extend({
  layoutTemplate: 'adminLayout', 
  waitOn: function(){
    return [Meteor.subscribe('sites'), Meteor.subscribe('sitePages')]; 
  },
  data: {
    selectedSite: function(){
      return selectedSite; 
    },  
    siteTypes: function(){
      return SiteTypes.find({});
    }
  }, 
  action: function() {
    if(this.params._name){
      selectedSite = Sites.findOne({name: this.params._name}); 
    }
    else {
      selectedSite = {};
    }  
    this.render(); 
  }
});

SiteCreateController = SiteEditController.extend({
  template: 'siteCreate' 
});

Template.siteForm.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var changes = objectFromForm(template); 
    debugger;  
    if (changes.name  === '' || changes.domain  === '') {
        alert('Name and Domain required');
        return;
    }
    if(this._id){
        Sites.update(this._id, {$set: changes}, function(error, result){
            if(error){
                alert(error);
            } else {
                //Iron.Location.go(Router.routes['admin']._path);
            }
        });
    } else {
        Sites.insert(changes, function(error, result){
            if(error){
                alert(error);
            } else {
                //Iron.Location.go(Router.routes['admin']._path);
            }
        });
    }
  },
  'change [name=logo]':function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    });
  },
  'click .delete': function() {
    if (confirm('Are you sure you want to delete "' + this.title + '"?'))
      Sites.remove(this._id)
  }
})

Template.siteForm.rendered = function () {
  CodeMirror.fromTextArea(this.find('[name=css]'), {
      lineNumbers: true,
      styleSelectedText: true,
      tabSize: 2,
      indentUnit: 2,
      indentWithTabs: true,
      mode: 'text/css',
  });

  CodeMirror.fromTextArea(this.find('[name=analyticsCode]'), {
    lineNumbers: true,
    styleSelectedText: true,
    tabSize: 2,
    indentUnit: 2,
    indentWithTabs: true,
    mode: 'text/javascript',
  });

  CodeMirror.fromTextArea(this.find('[name=metaDescription]'), {
    lineNumbers: true,
    styleSelectedText: true,
    tabSize: 2,
    indentUnit: 2,
    indentWithTabs: true,
    htmlMode: true,
    mode: 'htmlmixed'
  });
}

debugger;

Template.siteEdit.rendered = function () {
  var pages = Pages.find({}).fetch();
  debugger;
  var dataSource = new kendo.data.HierarchicalDataSource({
      data: pages, 
      schema: {
        model: {
          children: "childPages"
        }
      }
  });

  $("#pagesTreeview").kendoTreeView({
      dataSource: dataSource,
      dataTextField: "name"
  });  
}

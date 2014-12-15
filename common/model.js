Types = new Meteor.Collection('types'); 

Posts = new Meteor.Collection('posts');
PostTypes = new Meteor.Collection('postTypes'); 

Sites = new Meteor.Collection('sites'); 
Pages = new Meteor.Collection('pages'); 
Controls = new Meteor.Collection('controls'); 

var Images = new Meteor.Collection('images', {
  stores: [new FS.Store.FileSystem("images", {path: '/public'})] 
}); 

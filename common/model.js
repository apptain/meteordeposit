Content = new Mongo.Collection('content');
ContentTypes = new Mongo.Collection('contentTypes'); 

Sites = new Mongo.Collection('sites'); 
Pages = new Mongo.Collection('pages'); 
Controls = new Mongo.Collection('controls'); 

var Images = new Mongo.Collection('images', {
  stores: [new FS.Store.FileSystem("images", {path: '/public'})] 
}); 

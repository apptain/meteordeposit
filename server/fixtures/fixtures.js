Meteor.startup(function () {
  switch (process.env.ROOT_URL) {
    case Config.ProdDomain:
      CurrentProcessMode = ProcessMode.Prod;
      break;
    case Config.DevDomain:
      CurrentProcessMode = ProcessMode.Dev;
      break;
  }
  Fixtures.addSites(); 
  //Fixtures.addControls(); 
  Fixtures.addPages(); 
  Fixtures.addContent(); 
}); 

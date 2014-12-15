Template.layout.helpers({
  logo : function () {
    return Session.get('siteMeta').logo != 'undefined' && Session.get('siteMeta').logo != '' ? 
      'imageLogo' : 'textLogo';  
  }
}) 

Template.imageLogo.helpers({
  logoPath : function () {
    return '/' + Session.get('siteMeta').logo;  
  }
}) 

Template.textLogo.helpers({
  siteName : function () {
      return Session.get('siteMeta').name;  
  }
});  


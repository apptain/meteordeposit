Template.layout.helpers({
  logo : function () {
    if(Session.get('siteMeta').logo != 'undefined' && Session.get('siteMeta').logo != '')
      return 'imageLogo';
    else
      return 'textLogo';  
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


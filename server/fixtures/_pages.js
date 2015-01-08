Fixtures.addPages = function () {
  Pages.remove({});  
  if(Pages.find().count() === 0){
     Pages.insert({
      site: ['apptain', 'dev', 'meteordeposit'], 
      name: 'Home', 
      route: 'Home',
      pageUrl: '/',
      title: 'Home',
      description: '', 
      keywords: '', 
      htmlInHeader: '', 
      index: true,
      showInNav: false, 
      primaryContentType: 'template', 
      primaryContent: 'postList',
      secondarContentType: 'html',  
      secondaryContent: '<h1>Get Appt!</h1>', 
      spriteCssClass: 'html' //For treeview
    });

    Pages.insert({
      site: ['dev', 'meteordeposit'], 
      name: 'TestHome', 
      route: 'TestHome',
      pageUrl: '/test',
      title: 'Test Home',
      description: '', 
      keywords: '', 
      htmlInHeader: '', 
      index: true,
      showInNav: false, 
      primaryContent: 'blogPostList', 
      secondaryContent: '', 
      spriteCssClass: 'html' //For treeview
    });
    
    Pages.insert({
      site: ['dev', 'meteordeposit'], 
      name: 'What Is Meteor Deposit?',
      route: 'WhatIsMeteorDeposit',  
      pageUrl: '/what-is-meteor-deposit',
      showInNav: true, 
      groupOnly: true,
      spriteCssClass: 'folder',
      childPages: [{
        site: ['dev', 'meteordeposit'], 
        name: 'A Multisite CMS!', 
        pageUrl: '/a-multisite-cms',
        description: '', 
        keywords: '', 
        htmlInHeader: '', 
        showInNav: true, 
        primaryContent: 'Write Me!', 
        secondaryContent: '', 
        spriteCssClass: 'html' //For treeview
        }, 
        {site: ['dev', 'meteordeposit'], 
        name: 'A Package for Use With Meteor', 
        pageUrl: '/a-package-for-use-with-meteor',
        description: '', 
        keywords: '', 
        htmlInHeader: '', 
        showInNav: true, 
        primaryContent: 'Make me True!', 
        secondaryContent: '',
        spriteCssClass: 'html'
      }]
    });
  }
}

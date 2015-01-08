Fixtures.addSites = function () {
  Sites.remove({});   
    if(Sites.find().count() === 0){
      Sites.insert({
        name: 'apptain',
        domain: 'http://apptain.com',  
        title: 'Apptain | Obtain Your Application', 
        logo: 'apptain.png', 
        favico: 'apptain.ico', 
        analyticsCode : "<script>\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n\n  ga('create', 'UA-10100725-2', 'auto');\n  ga('send', 'pageview');\n\n</script>"
      });
      Sites.insert({
        name: 'meteordeposit', 
        domain: 'http://meteordeposit.com',
        favico: 'meteordeposit.ico', 
        analyticsCode : "<script>\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n\n  ga('create', 'UA-58237100-1', 'auto');\n  ga('send', 'pageview');\n\n</script>"
      });
      Sites.insert({
        name: 'dev', 
        domain: 'http://localhost:3000/',
        favico: 'meteordeposit.ico', 
        logo: 'apptain.png', 
     });
    }
}

Meteor.startup(function () {
  switch (process.env.ROOT_URL) {
      case Config.ProdDomain:
          console.log('Prod Mode');
          CurrentProcessMode = ProcessMode.Prod;
          break;
      case Config.DevDomain:
          console.log('Dev Mode');
          CurrentProcessMode = ProcessMode.Dev;
          break;
  }
  
  if(Sites.find().count() === 0){
    Sites.insert({
      name: 'apptain',
      domain: 'http://apptain.com/' 
    });
    Sites.insert({
      name: 'meteordeposit', 
      domain: 'http://meteordeposit.com/'
    });
    Sites.insert({
      name: 'dev', 
      domain: 'http://localhost:3000/'
    });
  }

  if(ContentTypes.find().count() === 0){
      ContentTypes.insert({
        name: 'Blog',           
      }); 
      ContentTypes.insert({
        name: 'Site',           
      }); 
      ContentTypes.insert({
        name: 'Portfolio',           
      }); 
  }

  if(Content.find().count() === 0){
      var body = JSON.parse(JSON.stringify('<p>meteordeposit is a functional opensource CMS built on meteor. Now functional as of today really means extremely minimum viable product. It is built on meteor using mvc with iron-router, css preprocessing with stylus, and is deploying via continuous integration. I very well plan to continue development and document the process in a hopefully somewhat entertaining and enlightening way.</p><p>The code is available at <a href="https://github.com/apptain/meteordeposit">https://github.com/apptain/meteordeposit</a></p><p>The goal of this app is to:</p><ol><li><p>Study and abstract the core of what CMS and really all apps are asked to,&nbsp;<b>manage content</b></p></li><li><p>Contribute to and document the evolution of meteor, which I firmly believe has the potential to equalize web and native apps in the very near future.</p></li><li><p>Contribute to the study of responsive design.</p></li><li><p>Build a simple but robust content management system usable as backbone component for other apps. </a></p><p></p></li></ol><p>A lot of credit for this first release of meteordeposit should goto the open source blogging system <a href="https://github.com/percolatestudio/ground-control">ground-control</a>, which along with <a href="https://github.com/TelescopeJS/Telescope">telescope</a> from <a href="https://www.discovermeteor.com/">discovermeteor.com</a> provided great example code. The biggest differences between meteordeposit and ground-control as of now, is that meteordeposit utilizes iron-router from <a href="https://www.eventedmind.com/">eventedmind</a> and has a completely different security model, which I will be doing a follow up post on and developing further very soon.</p><h4>References</h4><div><h4 class="western"><font color="#000000"><font face="Times"><font size="4">References</font></font></font></h4></div><div><ul><li><p>ground-control</p><ul><li><p><a href="https://github.com/percolatestudio/ground-control">https://github.com/percolatestudio/ground-control</a></p></li><li><p><a href="http://percolatestudio.com/">http://percolatestudio.com/</a></p></li><li><p><a href="http://blog.percolatestudio.com/">http://blog.percolatestudio.com/</a></p></li></ul></li><li><p>eventedmind</p><ul><li><p><a href="https://www.eventedmind.com/">https://www.eventedmind.com/</a></p></li><li><p><a href="https://github.com/EventedMind/iron-router">https://github.com/EventedMind/iron-router</a></p></li><li><p><a href="https://github.com/EventedMind/em">https://github.com/EventedMind/em</a></p></li><li><p><a href="https://www.youtube.com/watch?v=owJQblMSIO0#t=2069">https://www.youtube.com/watch?v=owJQblMSIO0#t=2069</a></p></li></ul></li><li><p>discovermeteor</p><ul><li><p><a href="https://www.discovermeteor.com/">https://www.discovermeteor.com/</a></p></li><li><p><a href="https://github.com/TelescopeJS/Telescope">https://github.com/TelescopeJS/Telescope</a></p></li></ul></li><li><p>Tuts Become a CSS Superhero WithStylus by Kezz Bracey</p><ul><li><p><a href="http://webdesign.tutsplus.com/courses/become-a-css-superhero-with-stylus">http://webdesign.tutsplus.com/courses/become-a-css-superhero-with-stylus</a></p></li></ul></li></ul></div>'));  
  Content.insert({
      site: 'all', 
      datePublished: '12/3/2014', 
      title: 'meteordeposit Released',
      slug: 'meteordeposit-released',
      type: 'Blog',
      body: body
  });
    }
}); 

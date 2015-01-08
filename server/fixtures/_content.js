Fixtures = {}; 
Fixtures.addContent = function () {  
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
  
  Content.remove({}); 
  if(Content.find().count() === 0){
      var body = JSON.parse(JSON.stringify('<p>meteordeposit is a functional opensource CMS built on meteor. Now functional as of today really means extremely minimum viable product. It is built on meteor using mvc with iron-router, css preprocessing with stylus, and is deploying via continuous integration. I very well plan to continue development and document the process in a hopefully somewhat entertaining and enlightening way.</p><p>The code is available at <a href="https://github.com/apptain/meteordeposit">https://github.com/apptain/meteordeposit</a></p><p>The goal of this app is to:</p><ol><li><p>Study and abstract the core of what CMS and really all apps are asked to,&nbsp;<b>manage content</b></p></li><li><p>Contribute to and document the evolution of meteor, which I firmly believe has the potential to equalize web and native apps in the very near future.</p></li><li><p>Contribute to the study of responsive design.</p></li><li><p>Build a simple but robust content management system usable as backbone component for other apps. </a></p><p></p></li></ol><p>A lot of credit for this first release of meteordeposit should goto the open source blogging system <a href="https://github.com/percolatestudio/ground-control">ground-control</a>, which along with <a href="https://github.com/TelescopeJS/Telescope">telescope</a> from <a href="https://www.discovermeteor.com/">discovermeteor.com</a> provided great example code. The biggest differences between meteordeposit and ground-control as of now, is that meteordeposit utilizes iron-router from <a href="https://www.eventedmind.com/">eventedmind</a> and has a completely different security model, which I will be doing a follow up post on and developing further very soon.</p><h4>References</h4><div><h4 class="western"><font color="#000000"><font face="Times"><font size="4">References</font></font></font></h4></div><div><ul><li><p>ground-control</p><ul><li><p><a href="https://github.com/percolatestudio/ground-control">https://github.com/percolatestudio/ground-control</a></p></li><li><p><a href="http://percolatestudio.com/">http://percolatestudio.com/</a></p></li><li><p><a href="http://blog.percolatestudio.com/">http://blog.percolatestudio.com/</a></p></li></ul></li><li><p>eventedmind</p><ul><li><p><a href="https://www.eventedmind.com/">https://www.eventedmind.com/</a></p></li><li><p><a href="https://github.com/EventedMind/iron-router">https://github.com/EventedMind/iron-router</a></p></li><li><p><a href="https://github.com/EventedMind/em">https://github.com/EventedMind/em</a></p></li><li><p><a href="https://www.youtube.com/watch?v=owJQblMSIO0#t=2069">https://www.youtube.com/watch?v=owJQblMSIO0#t=2069</a></p></li></ul></li><li><p>discovermeteor</p><ul><li><p><a href="https://www.discovermeteor.com/">https://www.discovermeteor.com/</a></p></li><li><p><a href="https://github.com/TelescopeJS/Telescope">https://github.com/TelescopeJS/Telescope</a></p></li></ul></li><li><p>Tuts Become a CSS Superhero WithStylus by Kezz Bracey</p><ul><li><p><a href="http://webdesign.tutsplus.com/courses/become-a-css-superhero-with-stylus">http://webdesign.tutsplus.com/courses/become-a-css-superhero-with-stylus</a></p></li></ul></li></ul></div>'));  
    Content.insert({
      site: 'all', 
      datePublished: '12/10/2014', 
      title: 'meteordeposit Released',
      slug: 'meteordeposit-released',
      type: 'Blog',
      body: body
    });
    body = JSON.parse(JSON.stringify("<p>I wanted to implement the simplest possible security model to get meteordeposit started, but also a model that is strong and protects access to the collections even if someone were to deploy meteordeposit as a website directly as cloned from github. The resulting security model with which meteordeposit has started is that you can only make updates to <u>collections when running in the site in localhost</u>.&nbsp;</p><p>The below config specifies the prod and dev domains, and at startup the app will check the environment root url. The collections' allow, insert, and remove server side checks will only return true to permit updates if the site is running under the localhost url. This is done all server side to prevent any issues with script injection.&nbsp;</p><pre><code>From /server/config.js Config = {\n    ProdDomain: 'http://meteordeposit.com/',\n    DevDomain: 'http://localhost:3000/' \n}</code></pre><pre><code>From /server/fixtures.js   Meteor.startup(function () {\n    switch (process.env.ROOT_URL) {\n        case Config.ProdDomain:\n            console.log('Prod Mode');\n            CurrentProcessMode = ProcessMode.Prod;\n            break;\n        case Config.DevDomain:\n            console.log('Dev Mode');\n            CurrentProcessMode = ProcessMode.Dev;\n            break;\n    }</code></pre><pre><code>From /server/publications.jsPosts.allow({\n    insert: function (userId, post) {\n        return CurrentProcessMode === ProcessMode.Dev;\n    },\n    update: function (userId) {\n        return CurrentProcessMode === ProcessMode.Dev;\n    },\n    remove: function (userId) {\n        return CurrentProcessMode === ProcessMode.Dev;\n    },\n    fetch: []\n});</code></pre><div><h3>How Can Updates Be Deployed to Production?</h3><div>Well that turns out to be pretty simple. When running the meteor site local simply enter the connection string first. I'm currently running on Modulus, so when I start meteor local using the production connection string it looks something like.</div></div><pre><code>MONGO_URL=\"mongodb://username:password@proximus.modulusmongo.net:27017/abcdefgh\" meteor</code></pre><p>I know it's not the most beautiful solution, but just like this app it is evolving and is at least functional. Really the next step I envision for authentication is a cert based system where certs can only be created when running local, but that is going to take a bit more investigation</p>"));
    Content.insert({
      site: 'all', 
      datePublished: '12/11/2014', 
      title: 'Security Model for meteordeposit',
      slug: 'security-model-for-meteordeposit',
      type: 'Blog',
      body: body
    });
  }
}

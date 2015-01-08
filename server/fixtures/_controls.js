Fixtures.addControls = function () {  
  Content.remove({}); 
  if(Content.find().count() === 0){
    Controls.insert({
      name: 'postList', 
      html: '"{{#each content}}\n\t{{> post}}\n{{/each}}\n\n"' 
      //html: "<template name=\"index\">\n  {{#contentFor \"secondary\"}}\n    <h1>Get Appt!</h1>\n  {{/contentFor}}\n  {{> postList}}\n</template>\n"
    });

    Controls.insert({
      name: 'post', 
      html: '<div class=\"title\">\n      <h3>{{title}}</h3>\n    </div>\n    <div class=\"body\">\n      {{{body}}}\n    </div>\n\n'
    }); 
  }
}




Handlebars.registerHelper('sessionEquals', function(key, value) {
  return Session.equals(key, value);
});

Handlebars.registerHelper('sessionGet', function(key) {
  return Session.get(key);
});


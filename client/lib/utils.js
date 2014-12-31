objectFromForm = function (template) {
  var object = {};
  //TODO Each template and not whole page
  $('input, select, textarea').each(function () {
    if (this.name != '') {
      object[this.name] = template.find('[name=' + this.name + ']').value;
    }
  });
  return object;
}

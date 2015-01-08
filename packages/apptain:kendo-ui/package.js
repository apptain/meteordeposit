Package.describe({
  summary: 'Package of last GNU (GPL) full open source verson of kendo-ui including treeview and editor',
  version: '1.0.0'
}); 

Package.on_use(function (api) {
  api.use("jquery", "client");
  
  api.add_files([
    'lib/lib/kendo.core.js', 
    'lib/lib/kendo.list.js'
  ], 'client'); 
  api.add_files('lib/kendo.calendar.js', 'client');
  api.add_files('lib/kendo.colorpicker.js', 'client');
  api.add_files('lib/kendo.combobox.js', 'client');
  api.add_files('lib/kendo.data.js', 'client');
  api.add_files('lib/kendo.timepicker.js', 'client');
  api.add_files('lib/kendo.datetimepicker.js', 'client');
  api.add_files('lib/kendo.draganddrop.js', 'client');
  api.add_files('lib/kendo.datetimepicker.js', 'client');
  api.add_files('lib/kendo.draganddrop.js', 'client');
  api.add_files('lib/kendo.dropdownlist.js', 'client');
  api.add_files('lib/kendo.editable.js', 'client');
  api.add_files('lib/kendo.editor.js', 'client');
  api.add_files('lib/kendo.grid.js', 'client');
  api.add_files('lib/kendo.imagebrowser.js', 'client');
  api.add_files('lib/kendo.mobile.scroller.js', 'client');
  api.add_files('lib/kendo.popup.js', 'client');
  api.add_files('lib/kendo.progressbar.js', 'client');
  api.add_files('lib/kendo.treeview.js', 'client');
  api.add_files('lib/kendo.upload.js', 'client');
  api.add_files('lib/kendo.window.js', 'client');
  
  //api.export('ken', 'client'); 
});


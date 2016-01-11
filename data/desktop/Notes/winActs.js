include([],function () {
  var script = document.currentScript;
  var main = µ('win-dow[name='+µ('|>window',script)+']');
  var text = µ('#text', main);
  var menu = µ('.winMenu', main);

  var file = document.createElement('menu-item');
  file.addTitle('File');
  file.addOption('Save', function() {
    main.save();
  });

  file.addOption('Save as...');

  file.addDivider();
  file.addOption('Close', function() {
    main.close();
  });

  menu.appendChild(file);

  var edit = document.createElement('menu-item');
  edit.addTitle('Edit');
  edit.addOption('Undo');
  edit.addOption('Redo');
  edit.addDivider();
  edit.addOption('Copy');
  edit.addOption('Paste');

  menu.appendChild(edit);

  var help = document.createElement('menu-item');
  help.addTitle('Help');
  help.addOption('Help...');

  menu.appendChild(help);

  main.content.onmousedown = function () {

  };

  text.onfocus = function() {
    text.focused = true;
    console.log('focus');
  };

  text.focus();
});

include([],function () {
  var script = document.currentScript;
  var main = µ('win-dow[name='+µ('|>window',script)+']');
  console.log('poop');
  var text = µ('#text', main);
  var menu = µ('.winMenu', main);

  var file = document.createElement('menu-item');
  file.addTitle('File');
  file.addOption('Save', function() {
    //main.close();
  });

  file.addOption('Close', function() {
    main.close();
  });

  menu.appendChild(file);

  var edit = document.createElement('menu-item');
  edit.addTitle('Edit');
  edit.addOption('Copy', function() {

  });

  edit.addOption('Paste', function() {

  });

  menu.appendChild(edit);

  main.content.onmousedown = function () {

  };

  text.onfocus = function() {
    text.focused = true;
    console.log('focus');
  };
});

include([], function() {
  var script = document.currentScript;
  var main = µ('win-dow[name=' + µ('|>window', script) + ']');
  console.log('poop');
  var text = µ('#text', main);
  var menu = µ('.winMenu', main);

  var file = document.createElement('menu-item');
  file.addTitle('File');
  file.addOption('Save', function() {
    //main.close();
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

  main.content.onmousedown = function() {

  };

  function makeKeyEvent(type, keycode, element) {
  var keyboardEvent = document.createEvent('KeyboardEvent');
  keyboardEvent.initKeyboardEvent(
   type, // event type : keydown, keyup, keypress
    true, // bubbles
    true, // cancelable
    window, // viewArg: should be window
    false, // ctrlKeyArg
    false, // altKeyArg
    false, // shiftKeyArg
    false, // metaKeyArg
    keycode, // keyCodeArg : unsigned long the virtual key code, else 0
    0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
  );
  element.dispatchEvent(keyboardEvent);
}

  main.content.keydown = function(e) {
    e.preventDefault();
    makeKeyEvent('keydown', e.which + 1, this);
  };

  text.onfocus = function() {
    text.focused = true;
    console.log('focus');
  };
});

include([], function() {
  var script = document.currentScript;

  var main = µ('win-dow[name=' + µ('|>window', script) + ']');
  var icon = µ('eye-con[name=' + µ('|>window', script) + ']');

  //console.log(main);
  var menu = µ('.winMenu', main);

  var foot = µ('.winFoot', main);

  var fcont = µ('.frameContent', main.content);
  var cont = µ('+div', fcont);

  var kids = icon.querySelectorAll('eye-con');
  for (var i = 0; i < kids.length; i++) {
    cont.appendChild(kids[i]);
    kids[i].style.display = 'inline-block';
  }

  µ('+div', foot).textContent = kids.length + ' file(s)';

  main.onClose = function(contn) {
    var kids = contn.querySelectorAll('eye-con');
    for (var i = 0; i < kids.length; i++) {
      icon.appendChild(kids[i]);
      kids[i].style.display = 'none';
    }
  };

  var file = document.createElement('menu-item');
  file.addTitle('File');
  file.addOption('Open', function(argument) {
    var sel = cont.selected;
    if (sel) sel.openWindow();
  });

  file.addOption('Open with...');
  file.addOption('Print...');

  file.addDivider();
  file.addOption('Delete');

  file.addDivider();
  file.addOption('Close Window', function() {
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

  main.style.visibility = 'visible';
});

var script = document.currentScript;

include(['src/libraries/difflib.js'], function() {
  console.log(µ('|>window', script));
  var main = µ('win-dow[name=' + µ('|>window', script) + ']');
  console.log(main);
  var menu = µ('.winMenu', main);

  var file = document.createElement('menu-item');
  file.addTitle('File');
  file.addOption('Open');

  file.addOption('Open folder...');
  file.addDivider();
  file.addOption('Print...');

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

  var hist = document.createElement('menu-item');
  hist.addTitle('History');
  hist.addOption('Home', function() {
    main.navigate('data/drk/home.html');
  });

  hist.addDivider();
  hist.addOption('Recently Visited');
  hist.addOption('Mad Science Blog', function() {
    main.navigate('data/drk/error.html');
  });

  hist.addOption('Zombie Recipes', function() {
    main.navigate('data/drk/error.html');
  });

  menu.appendChild(hist);

  var help = document.createElement('menu-item');
  help.addTitle('Help');
  help.addOption('Help...');

  menu.appendChild(help);

  var div = µ('+div', menu);
  div.className = 'entryDivider';

  var address = µ('+div', menu);
  address.className = 'addressBar';

  var addLbl = µ('+div', address);
  addLbl.textContent = 'Address';

  var addBox = µ('+div', address);
  addBox.className = 'addressBox inset';
  addBox.contentEditable = true;
  addBox.textContent = µ('#load', main).src;

  menu.style.height = '42px';

  main.resetContentHeight();

  main.changeSize(640, 480);

  main.navigate = function(add, local) {
    if (~add.indexOf('http://')) {
      add = add.substring(7);
    }

    var comp = new difflib.SequenceMatcher(add, 'www.labsecurity.com/drk');
    if (~add.indexOf('www.labsecurity.com/drk')) add = 'data/drk/video.html';
    else if (comp.ratio() > 0.9) {
      add = 'data/drk/close.html';
    } else {
      add = 'data/drk/error.html';
    }

    µ('#load', main).src = add;
  };

  addBox.onkeypress = function(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      e.preventDefault();
      main.navigate(addBox.textContent);
      addBox.blur();
    }
  };

  main.content.onmousedown = function() {

  };

  main.style.visibility = 'visible';
});

include([], function() {
  var script = document.currentScript;
  var main = µ('win-dow[name=' + µ('|>window', script) + ']');
  var text = µ('#text', main);
  var menu = µ('.winMenu', main);

  main.changeSize(820, 512);
  main.style.minWidth = '650px';
  main.style.minHeight = '375px';

  var cont = µ('.frameContent', main.content);

  var cal = transplant(µ('cal-endar', cont));

  var file = document.createElement('menu-item');
  file.addTitle('File');

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

  var div = µ('+div', menu);
  div.className = 'entryDivider';

  var monthBar = µ('+div', menu);
  monthBar.className = 'calMonthBar';

  var monthPrev = µ('+div', monthBar);
  monthPrev.className = 'leftArrow';

  var monthLbl = µ('+div', monthBar);
  monthLbl.className = 'monthName';
  monthLbl.textContent = cal.getMonthAndYear();

  var monthNext = µ('+div', monthBar);
  monthNext.className = 'rightArrow';

  menu.style.height = '42px';

  main.resetContentHeight();

  monthNext.onclick = function(e) {
    cal.nextMonth();
    monthLbl.textContent = cal.getMonthAndYear();
  };

  monthPrev.onclick = function(e) {
    cal.prevMonth();
    monthLbl.textContent = cal.getMonthAndYear();
  };

  main.onmousedown = function(e) {
    e.preventDefault();
  };

  main.style.visibility = 'visible';
});

include([], function() {
  var script = document.currentScript;
  var main = µ('win-dow[name=' + µ('|>window', script) + ']');

  main.changeSize(720, 480);

  main.content.style.backgroundColor = '#ccb';

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

  var slides = main.content.querySelectorAll('.slideCont');
  slides = [].slice.call(slides);
  slides.forEach(function(cur, ind, arr) {
    var sl = cur;
    sl.onmousedown = function () {
      µ('.currentSlide').className = µ('.currentSlide').className.replace(' currentSlide', '');
      sl.className += ' currentSlide';
      µ('#displayedSlide').src = µ('img',sl).src;
    }
  });

});

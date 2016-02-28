include([], function() {
  var script = document.currentScript;
  var main = µ('win-dow[name=' + µ('|>window', script) + ']');
  var text = µ('#text', main);
  var menu = µ('.winMenu', main);

  main.changeSize(375, 400);

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

  main.content.onmousedown = function() {

  };

  function insertAtCaret(el, text) {
    var txtarea = el;
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        'ff' : (document.selection ? 'ie' : false));
    if (br == 'ff') strPos = txtarea.selectionStart;

    var front = (txtarea.textContent).substring(0, strPos);
    var back = (txtarea.textContent).substring(strPos, txtarea.textContent.length);
    txtarea.textContent = front + text + back;
    strPos = strPos + text.length;
    if (br == 'ie') {
      txtarea.focus();
      var range = document.selection.createRange();
      range.moveStart('character', -txtarea.textContent.length);
      range.moveStart('character', strPos);
      range.moveEnd('character', 0);
      range.select();
    } else if (br == 'ff') {
      txtarea.selectionStart = strPos;
      txtarea.selectionEnd = strPos;
      txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
  }

  function getCaretPosition(editableDiv) {
    var caretPos = 0,
      sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement('span');
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint('EndToEnd', range);
        caretPos = tempRange.text.length;
      }
    }

    return caretPos;
  }

  var addChar = false;

  text.onkeydown = function(e) {
    if (e.which <= 32) {
      addChar = false;
    } else addChar = true;
  };

  text.onkeypress = function(e) {
    if (e.which >= 32 && e.which <= 127) {
      addChar = true;
    }
  };

  function replaceAt(str, index, char) {
    return str.substr(0, index) + char + str.substr(index + char.length);
  }

  function unParse(str) {
    var next = '';
    for (var i = 0; i < str.length; i++) {
      //var temp = (str.charCodeAt(i) - 32 - (i + 1));
      //var temp = (str.charCodeAt(i) - 32 - 65);
      var temp = (str.charCodeAt(i) - 32 - 1);
      while (temp <= 0) temp += 94;

      //next += String.fromCharCode((temp) % 94 + 32);
      next += String.fromCharCode((temp % 94 + 32));
    }

    console.log(next);
  }

  unParse('the closet opens with 6217');

  text.oninput = function() {
    var pos = getCaretPosition(text);
    var str = text.textContent;

    if (pos > 0 && addChar) {
      var cur = str.charCodeAt(pos - 1);

      //str = replaceAt(str, pos - 1, String.fromCharCode(32 + ((cur - 32 + pos) % 94)));
      //str = replaceAt(str, pos - 1, String.fromCharCode(32 + ((cur - 32 + 65) % 94)));
      str = replaceAt(str, pos - 1, String.fromCharCode(32 + ((cur - 32 + 1) % 94)));
      text.textContent = str;

      var range = document.createRange();
      var sel = window.getSelection();

      range.setStart(text.childNodes[0], pos);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

    }
  };

  text.onfocus = function() {
    text.focused = true;
    console.log('focus');
  };

  text.focus();

  main.style.visibility = 'visible';
});

//6 hours

include(['src/retroWin/menuItems.js'], function() {
  var dt = µ('#windows');
  dt.onmousemove = function(e) {
    if (dt.dragged) dt.dragged.drag(e);
  };

  dt.onmouseup = function(e) {
    if (dt.dragged) dt.dragged.release(e);
  };

  var newPos = { x:75, y:75 };

  var winDow = inheritFrom(HTMLElement, function() {
    this.attachedCallback = function() {
      var _this = this;

      _this.style.left = newPos.x + 'px';
      _this.style.top = newPos.y + 'px';
      newPos.x = (newPos.x + 30) % 200;
      newPos.y = (newPos.y + 20) % 200;

      _this.name = µ('|>name', _this);
      _this.textContent = '';

      var ttlBar = µ('+div', this);
      ttlBar.className = 'windowTitle';

      var icon = µ('+img', ttlBar);
      icon.src = 'data/desktop/' + _this.name + '/icon.png';

      var title = µ('+div', ttlBar);
      title.className = 'winTitle';
      title.textContent = _this.name.replace(/_/g, ' ');

      var min = µ('+div', ttlBar);
      min.className = 'winMin winButton';
      var close = µ('+div', ttlBar);
      close.className = 'winClose winButton';

      var menuBar = µ('+div', this);
      menuBar.className = 'winMenu';

      _this.content = µ('+div', _this);
      _this.content.className = 'winContent inset';

      var foot = µ('+div', this);
      foot.className = 'winFoot inset';

      var resize = µ('+img', foot);
      resize.className = 'winResize';
      resize.src = 'img/resize.png';

      _this.tray = µ('+div', µ('#winTray'));
      _this.tray.className = 'trayButton button';
      _this.tray.appendChild(icon.cloneNode(true));
      _this.tray.appendChild(title.cloneNode(true));

      _this.resetContentHeight = function() {
        var totHeight = menuBar.offsetTop;
        totHeight += menuBar.offsetHeight;
        _this.content.style.top = totHeight + 'px';
        totHeight += foot.offsetHeight;
        _this.content.style.height = 'calc(100% - ' + (totHeight + 5) + 'px)';
      };

      _this.hide = function() {
        _this.focused = false;
        ttlBar.style.backgroundColor = '#777';
        _this.tray.className = 'trayButton button';
        _this.style.display = 'none';
        _this.hidden = true;
      };

      _this.show = function() {
        _this.style.display = 'flex';
        _this.hidden = true;
      };

      _this.onClose = function(cont) {

      };

      _this.close = function() {
        µ('#winTray').removeChild(_this.tray);
        var origin = µ('eye-con[name=' + _this.name + ']');

        µ('head').removeChild(µ('script[window=' + _this.name + ']'));
        var frameCont = _this.content.getElementsByClassName('frameContent')[0];
        var cont = _this.content.removeChild(frameCont, _this.content);

        _this.onClose(cont);

        _this.parentElement.removeChild(_this);
      };

      _this.save = function() {
        var node = _this.content.getElementsByClassName('frameContent')[0].cloneNode(true);
        var origin = µ('eye-con[name=' + _this.name + ']');
        var old = origin.content.getElementsByClassName('frameContent')[0];
        old.parentElement.insertBefore(node, old);
        old.parentElement.removeChild(old);
      };

      _this.tray.onmousedown = function(e) {
        e.preventDefault();
        this.press = true;
      };

      _this.tray.onmouseup = function(e) {
        if (_this.focused) _this.hide();
        else {
          if (_this.hidden) _this.show();
          _this.focus();
        }
      };

      _this.focus = function() {
        var wins = document.querySelectorAll('win-dow');
        for (var i = 0; i < wins.length; i++) {
          if (wins[i] != _this) {
            wins[i].focused = false;
            wins[i].style.zIndex = parseInt(wins[i].style.zIndex) - 1;
            µ('.windowTitle', wins[i]).style.backgroundColor = '#777';
            wins[i].tray.className = 'trayButton button';
          }
        }

        _this.style.zIndex = wins.length - 1;
        _this.focused = true;
        µ('.windowTitle', _this).style.backgroundColor = '#008';
        _this.tray.className = 'trayButton buttonActive';
      };

      _this.onmousedown = function() {
        if (!_this.focused) _this.focus();
      };

      ttlBar.onmousedown = function(e) {
        e.preventDefault();
        _this.dragging = true;
        var rect = _this.getBoundingClientRect();
        _this.mouse = {
          x: (e.clientX - rect.left),
          y: (e.clientY - rect.top),
        };
        dt.dragged = _this;
      };

      _this.changeSize = function(wid, hgt) {
        _this.style.width = wid + 'px';
        _this.style.maxWidth = wid + 'px';
        _this.style.height = hgt + 'px';
        _this.style.maxHeight = hgt + 'px';
      };

      _this.drag = function(e) {
        if (_this.dragging) {
          _this.style.left = e.clientX - _this.mouse.x + 'px';
          _this.style.top = (e.clientY - _this.mouse.y) + 'px';
        } else if (_this.resize) {
          _this.changeSize(e.clientX + _this.mouse.x, e.clientY + _this.mouse.y);
        }
      };

      _this.release = function(e) {
        _this.dragging = _this.resize = false;
        dt.dragged = null;
      };

      resize.onmousedown = function(e) {
        e.preventDefault();
        _this.resize = true;
        dt.dragged = _this;
        var rect = _this.getBoundingClientRect();
        _this.mouse = {
          x: (rect.right - e.clientX) - rect.left,
          y: (rect.bottom - e.clientY) - rect.top,
        };
        console.log(_this.mouse);
      };

      min.onmousedown = function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.press = true;
      };

      min.onmouseup = function(e) {
        if (this.press) _this.hide();
      };

      close.onmousedown = function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.press = true;
      };

      close.onmouseup = function() {
        if (this.press) {
          _this.close();
        }
      };

      close.onmouseout = function() {
        this.press = false;
      };

      _this.resetContentHeight();
    };
  });

  document.registerElement('win-dow', winDow);

  window.winDow = winDow;
});

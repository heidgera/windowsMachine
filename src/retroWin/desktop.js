//10 hours

include(['src/retroWin/windows.js'], function() {
  µ('#desktop').nextPosition = {x:20, y:20};
  µ('#desktop').fileVertically = true;
  var hgt = 80;
  var wid = 90;

  var eyeCon = inheritFrom(HTMLElement, function() {
    this.createdCallback = function() {
      var _this = this;
      this.name = µ('|>name', this);
      this.type = µ('|>type',this);

      var parent = _this.parentElement;
      var pos = parent.nextPosition;
      var vert = parent.fileVertically;

      if (pos) {
        _this.style.left = pos.x + 'px';
        _this.style.top = pos.y + 'px';
        if (vert) {
          pos.y += hgt;
          if (pos.y > _this.parentElement.offsetHeight - hgt) {
            pos.y = 20;
            pos.x += wid;
          }
        } else {
          pos.x += wid;
          if (pos.x > _this.parentElement.offsetWidth - wid) {
            pos.x = 20;
            pos.y += hgt;
          }
        }
      } else {
        _this.style.display = 'none';
      }

      _this.content = null;
      ajax('data/desktop/' + _this.name + '/contents.html', function(xml) {
        _this.content = µ('body',xml);
      });

      var icon = µ('+img',_this);
      icon.src = 'data/desktop/' + _this.name + '/icon.png';

      var title = µ('+div',_this);
      title.className = 'iconTitle';
      title.textContent = _this.name.replace('_',' ');
      if(_this.type != 'folder') title.textContent+='.'+_this.type;

      _this.select = function() {
        if(µ('.iconSelect')){
          µ('.iconSelect').parentElement.selected = null;
          µ('.iconSelect').className = '';
        }
        _this.className = 'iconSelect';
        _this.parentElement.selected = _this;
      };

      _this.openWindow = function() {
        _this.window = µ('win-dow[name='+_this.name+']');
        if(_this.window == null){
          _this.window = document.createElement('win-dow');
          _this.window.setAttribute('name',_this.name);
          var time = new Date();
          //_this.window = temp.cloneNode(true);
          µ('#windows').appendChild(_this.window);

          var node = _this.content.getElementsByClassName('frameContent')[0].cloneNode(true);
          _this.window.content.appendChild(node);
          _this.runScript = document.createElement('script');
          _this.runScript.src = 'data/desktop/' + _this.name + '/winActs.js?'+time;
          _this.runScript.setAttribute('window',_this.name);
          µ('head').appendChild(_this.runScript);
        }
        _this.window.focus();
      };

      _this.onmousedown = function(e) {
        e.preventDefault();
        _this.press = true;
      };

      _this.onmouseup = function(e) {
        if (_this.press) {
          if (_this.clickedOnce) _this.openWindow();
          else {
            _this.clickedOnce = true;
            _this.select();
            setTimeout(function() {_this.clickedOnce = false;}, 300);
          }
        }
      };
    };
  });

  document.registerElement('eye-con', eyeCon);
});

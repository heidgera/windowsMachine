include(['src/windows.js'], function() {
  var pos = {x:20, y:20};
  var hgt = 80;

  var eyeCon = inheritFrom(HTMLElement, function() {
    this.attachedCallback = function() {
      var _this = this;
      this.name = µ('|>name', this);

      _this.style.left = pos.x+'px';
      _this.style.top = pos.y+'px';
      pos.y += hgt;
      console.log(window.innerHeight);
      if(pos.y>window.innerHeight-hgt){
        pos.y = 20;
        pos.x += 90;
      }

      _this.content = null;
      ajax('data/desktop/' + _this.name + '/contents.html', function(xml) {
        _this.content = xml;
        //console.log(this.contents.firstChild);
      });

      var icon = µ('+img',_this);
      icon.src = 'data/desktop/' + _this.name + '/icon.png';

      var title = µ('+div',_this);
      title.className = 'iconTitle';
      title.textContent = _this.name.replace('_',' ');

      _this.select = function() {
        if(µ('.iconSelect')) µ('.iconSelect').className = '';
        _this.className = 'iconSelect';
      };

      _this.openWindow = function() {
        _this.window = µ('win-dow[name='+_this.name+']');
        if(_this.window == null){
          _this.window = document.createElement('win-dow');
          _this.window.setAttribute('name',_this.name);
          var time = new Date();
          //_this.window = temp.cloneNode(true);
          µ('#windows').appendChild(_this.window);

          _this.window.content.appendChild(µ('div',_this.content).cloneNode(true));
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

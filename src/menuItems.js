include([], function() {

  var menuItem = inheritFrom(HTMLElement, function() {
    this.createdCallback = function() {
      var _this = this;

      _this.item = µ('+div', _this);
      _this.item.className = 'menuItem';

      _this.entries = µ('+div', _this);
      _this.entries.className = 'menuDropdown raise'

      _this.close = function () {
        _this.entries.style.display = 'none';
        _this.item.style.backgroundColor = 'none';
        _this.opened = false;
      }

      _this.open = function () {
        _this.entries.style.display = 'block';
        _this.item.style.backgroundColor = '#998';
        _this.opened = false;
      }

      _this.item.onmousedown = function() {
        this.press = true;
      };

      _this.item.onmouseup = function() {
        if (this.press) {
          _this.open();
        }
      };

      _this.onmouseout = function (e) {
        if (_this.opened){
          //if(e.toElement.className == 'menuEntry') return;
          console.log(e.toElement);
          if(e.toElement.className == 'menuItem'){
            var next = e.toElement.parentElement;
            _this.close();
            next.open();
          }
          else _this.close();
        }
      }

      this.addTitle = function(ttl) {
        _this.item.textContent = ttl;
        _this.setAttribute('name', ttl);
      };

      this.addOption = function(name, callback) {
        var temp = µ('+div', _this.entries);
        temp.className = 'menuEntry';
        temp.textContent = name;
        temp.onmousedown = function(e) {
          this.press = true;
        };

        temp.onmouseup = function(e) {
          if (this.press) {
            callback();
            _this.close();
            this.press = false;
          }
        };

        temp.onmouseout = function() {
          if (this.press) this.press = false;
        };
      };

      this.addDivider = function() {
        var div = µ('+div', _this.entries);
        div.className = 'entryDivider';
      };
    };

    this.attachedCallback = function() {

    };
  });

  document.registerElement('menu-item', menuItem);
});

var localStore = null;
var hardwareJS = '';
if (window.isApp === true) {
  localStore = chrome.storage.local;
  hardwareJS = './hardwareApp.js';
} else {
  localStore  = localStorage;
  hardwareJS = './hardware.js';
}

include([hardwareJS,'src/desktop.js'], function() {
  var refreshRate = 30;

  function timeString() {
    var time = new Date();

    var h = zeroPad(time.getHours(), 2);
    var m = zeroPad(time.getMinutes(), 2);
    var s = zeroPad(time.getSeconds(), 2);

    return ((h<=12)?h:h%12) + ((s%2)?':':'\u2009') + m + ((h>=12)?' PM':' AM');
  }

  µ('#clock').textContent = timeString();
  setInterval(function() {
    µ('#clock').textContent = timeString();
  }, 1000);

  //µ('#reset').onmousedown = µ('#attract').reset;

  var dt = µ('#windows');

  document.onmousemove = function(e) {
    e.preventDefault();
    if (dt.dragged) dt.dragged.drag(e);
  };

  document.onmouseup = function(e) {
    if (dt.dragged) dt.dragged.release(e);
  };

  document.onkeypress = function(e) {
    switch (e.which) {
      case charCode('s'):
        break;
      case 32:
        break;
      default:
        break;
    }
  };

  /*app.draw = function() {
  };

  drawTimer = setInterval(app.draw, 1000 / refreshRate);*/

  window.onresize = function(x, y) {
  };

  window.onresize();
});

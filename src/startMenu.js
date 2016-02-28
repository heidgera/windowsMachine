include([], function() {
  var start = µ('#start');
  var menu = µ('#startMenu');
  var loDial = µ('#logOutDialog');

  start.open = function() {
    start.opened = true;
    start.className = 'pressed';
    menu.style.visibility = 'visible';
  };

  start.close = function() {
    start.opened = false;
    start.className = '';
    menu.style.visibility = 'hidden';
  };

  start.onclick = function(e) {
    if (!start.opened) start.open();
    else start.close();
  };

  menu.onclick = function(e) {
    loDial.style.visibility = 'visible';
  };

  µ('#loYes').onclick = function() {
    loDial.style.visibility = 'hidden';
    login.logout();
  };

  µ('#loNo').onclick = function() {
    loDial.style.visibility = 'hidden';
  };

});

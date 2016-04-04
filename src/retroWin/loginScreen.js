include([], function() {
  var login = µ('#login');
  login.user = µ('|>user', login);
  login.pass = µ('|>pass', login);

  var uBox = µ('#username');

  var initName = uBox.textContent;

  var pBox = µ('#password');

  var okBut = µ('#loginOK');
  var cancel = µ('#loginCanel');

  login.login = function() {
    login.style.visibility = 'hidden';
    µ('#invalid').style.visibility = 'hidden';
    µ('#winLoggingIn').style.display = 'inline-block';
    µ('#winLoggingOut').style.display = 'none';
    setTimeout(function() {
      µ('#loginBG').style.visibility = 'hidden';
    }, 2000);
  };

  login.logout = function() {
    µ('#loginBG').style.visibility = 'visible';
    µ('#winLoggingOut').style.display = 'inline-block';
    µ('#winLoggingIn').style.display = 'none';
    uBox.textContent = initName;
    pBox.textContent = '';
    setTimeout(function() {
      login.style.visibility = 'visible';
    }, 2000);
  };

  login.wakeup = function() {
    µ('#loginBG').style.visibility = 'visible';
    login.style.visibility = 'visible';
    uBox.textContent = initName;
    pBox.textContent = '';
    µ('#invalid').style.visibility = 'hidden';
  };

  function authenticate() {
    if (uBox.textContent == login.user && pBox.textContent == login.pass) {
      login.login();
    } else {
      µ('#invalid').style.visibility = 'visible';
    }
  }

  okBut.onClick = function() {
    authenticate();
  };

  uBox.onkeydown = function(e) {
    var key = e.which;
    switch (key) {
      case 13:
        e.preventDefault();
        pBox.focus();
        break;
      default:
    }
  };

  pBox.onkeydown = function(e) {
    var key = e.which;
    switch (key) {
      case 13:
        e.preventDefault();
        pBox.focus();
        authenticate();
        break;
      case 8:
      default:
    }
  };
});

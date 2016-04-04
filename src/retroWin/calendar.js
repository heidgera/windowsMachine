//6 hours

include([], function() {
  console.log('there');

  var evEnt = inheritFrom(HTMLElement, function() {
    this.createdCallback = function() {
      var _this = this;

      _this.desc = _this.textContent;
      _this.textContent = '';

      _this.date = new Date(µ('|>date', _this));
      _this.time = µ('|>startTime', _this);
      _this.endTime = µ('|>endTime', _this);
      _this.subject = µ('|>subject', _this);
      _this.where = µ('|>where', _this);

      var controls = µ('+div', _this);
      controls.className = 'evControls inset';

      var back = µ('+div', controls);
      back.className = 'button evButton';
      back.textContent = '< Back';

      back.onclick = function() {
        _this.style.visibility = 'hidden';
      };

      // var save = µ('+div', controls);
      // save.className = 'button evButton';
      // save.textContent = 'Save';

      //µ('+div', _this).className = 'entryDivider';

      var content = µ('+div', _this);
      content.className = 'evContent inset';

      var subj = µ('+div', content);
      subj.className = 'evSubject';
      subj.textContent = _this.subject;

      var evTime = µ('+div', content);
      evTime.className = 'evTime';

      var fromDate = µ('+div', evTime);
      fromDate.className = 'evDateTime';
      fromDate.textContent = _this.date.toLocaleDateString('en-US');

      var fromTime = µ('+div', evTime);
      fromTime.className = 'evDateTime';
      fromTime.textContent = _this.time;

      var toText = µ('+span', evTime);
      toText.textContent = 'to';

      var toTime = µ('+div', evTime);
      toTime.className = 'evDateTime';
      toTime.textContent = _this.endTime;

      var toDate = µ('+div', evTime);
      toDate.className = 'evDateTime';
      toDate.textContent = _this.date.toLocaleDateString('en-US');

      var evDetails = µ('+div', content);
      evDetails.className = 'evDetails';

      var detailText = µ('+div', evDetails);
      detailText.textContent = 'Event Details';

      µ('+div', evDetails).className = 'entryDivider';

      var evWhere = µ('+div', evDetails);
      evWhere.className = 'evWhere';

      var whereText = µ('+span', evWhere);
      whereText.className = 'detailLabel';
      whereText.textContent = 'Where';

      var whereBox = µ('+div', evWhere);
      whereBox.className = 'evTextBox';
      if (_this.where) whereBox.textContent = _this.where;

      var evDesc = µ('+div', evDetails);
      evDesc.className = 'evDesc';

      var descText = µ('+span', evDesc);
      descText.className = 'detailLabel';
      descText.textContent = 'Description';

      var descBox = µ('+div', evDesc);
      descBox.className = 'evTextBox descBox';
      if (_this.desc) descBox.textContent = _this.desc;

      //console.log(_this.date.toLocaleDateString('en-US'));
    };
  });

  document.registerElement('ev-ent', evEnt);

  var calEndar = inheritFrom(HTMLElement, function() {
    this.attachedCallback = function() {
      var _this = this;

      console.log('here');

      var sDate = µ('|>date', _this).split('/');

      var frame = µ('+table', _this);
      frame.className = 'calFrame';

      _this.events = [].slice.call(_this.getElementsByTagName('ev-ent'));

      var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      var days = [];

      var header = µ('+tr', frame);
      header.className = 'inset';
      for (var j = 0; j < 7; j++) {
        var hd = µ('+th', header);
        hd.textContent = dayNames[j];
        hd.className = 'calDays';
      }

      for (var i = 0; i < 6; i++) {
        var line = µ('+tr', frame);
        for (var j = 0; j < 7; j++) {
          var day = µ('+td', line);
          days[j + i * 7] = day;
          day.number = µ('+div', day);
          day.number.className = 'calDate';
          day.events = µ('+div', day);
          day.events.className = 'dayVents';
        }
      }

      _this.currentMonth = new Date(parseInt(sDate[2]), parseInt(sDate[0]) - 1, 1);
      _this.today = new Date();

      _this.getCurrentMonth = function() {
        return monthNames[_this.currentMonth.getMonth()];
      };

      _this.getMonthAndYear = function() {
        return monthNames[_this.currentMonth.getMonth()] + ' ' + _this.currentMonth.getFullYear();
      };

      _this.fillDays = function(date) {
        //for (var i = 0; i < days.length; i++) {
        days.forEach(function(cur, ind, arr) {
          var tempDate = new Date(date.getFullYear(), date.getMonth(), ind - date.getDay() + 1);
          if (tempDate.getDate() == 1) {
            cur.number.textContent = monthNames[tempDate.getMonth()].substring(0, 3) + ' '
             + tempDate.getDate();
          } else cur.number.textContent = tempDate.getDate();
          cur.date = new Date(tempDate);
          if (cur.date.getMonth() != date.getMonth()) {
            cur.number.className = 'calDate';
          } else cur.number.className = 'calDate curMon';
          if (cur.date.toDateString() == _this.today.toDateString()) {
            cur.id = 'today';
          } else cur.id = '';

          cur.events.textContent = '';
          cur.events.onclick = null;

          _this.events.forEach(function(curEv, indEv, arrEv) {
            if (cur.date.toDateString() == curEv.date.toDateString()) {
              var ev = curEv;
              cur.events.textContent = ev.time + '- ' + ev.subject;
              console.log();
              cur.events.onclick = function(e) {
                ev.style.visibility = 'visible';
              };
            }
          });
        });
      };

      _this.fillDays(_this.currentMonth);

      _this.nextMonth = function() {
        _this.currentMonth.setMonth(_this.currentMonth.getMonth() + 1);
        _this.fillDays(_this.currentMonth);
      };

      _this.prevMonth = function() {
        _this.currentMonth.setMonth(_this.currentMonth.getMonth() - 1);
        _this.fillDays(_this.currentMonth);
      };

      _this.setMonth = function(num) {
        _this.currentMonth.setMonth(num);
      };

    };
  });

  document.registerElement('cal-endar', calEndar);
});


Meteor.startup(function () {
  // Update next & prev station
  Tracker.autorun(function () {
    var s = Session.get('s');
    if ( s ) {
      Meteor.call('getNextStation', s, function (err, ns) {
        Session.set('ns', ns);
      });
      Meteor.call('getPrevStation', s, function (err, ps) {
        Session.set('ps', ps);
      });
    }
  });
  if (navigator.geolocation) {
    //Geolocation APIを利用できる環境向けの処理
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var x = pos.coords.longitude;
        var y = pos.coords.latitude;
        Meteor.call('getNearStation', x, y, function (err, s){
          if ( err ) {
            alert('エラー:駅名を取得できません');
            return;
          }
          if ( s ) {
            Session.set('s', s);
          } else {
            console.log('error: nearest station not found');
          }


        });
      },
      function (err) {
        alert('エラー:位置情報を取得できません');
      }

    );
  } else {
    //Geolocation APIを利用できない環境向けの処理
    alert('位置情報を取得できません。');
  }
});


Template.station.helpers({
  kanji: function () {
    var s = Session.get("s");
    if ( s ) {
      return s.kanji; 
    } else {
      return "...";
    }
  },
  hiragana: function () {
    var s = Session.get("s");
    if ( s ) {
      return s.hiragana;
    } else {
      return "しらべています";
    }
  },
  nextStation: function () {
    var ns = Session.get("ns");
    if ( ns ) {
      $('#next-station-exists').removeClass('no');
      return ns.kanji;
    } else {
      $('#next-station-exists').addClass('no');
      return '...';
    }
  },
  prevStation: function () {
    var ps = Session.get("ps");
    if ( ps ) {
      $('#prev-station-exists').removeClass('no');
      return ps.kanji;
    } else {
      $('#prev-station-exists').addClass('no');
      return '...';
    }
  },
});

function randomEkiNum() {
  var num = Math.floor((Math.random() * 100000) % 39);
  return num;
}

//
// XXX: for debug.
//      It needs 'autopublish' & 'insecure'.
//
Template.station.events({
  "click #change": function () {
    var num = randomEkiNum();
    var s = Stations.find({number: num}).fetch()[0];
    Session.set('s', s);
    console.log(num);
    console.log(s);
  },
});

function openHelp() {
  $('#help-container').addClass('active');
  $('#help').html('&times;');
};

function closeHelp() {
  $('#help-container').removeClass('active');
  $('#help').text('？');
};

function toggleColor() {
  var $switcher = $('#color-switcher');
  $('html').css('background', $switcher.css('background'));
  if ( $switcher.hasClass('dark') ) {
    $switcher.removeClass('dark');
  } else {
    $switcher.addClass('dark');
  }
};

Template.help.events({
  "click #help-container": function () {
    if ( $('#help-container').hasClass('active') ) {
      closeHelp();
    }
  },
  "click #help": function () {
    if ( $('#help-container').hasClass('active') ) {
      closeHelp();
    } else {
      openHelp();
    }
  },
  "click #color-switcher": function () {
    toggleColor();
  }
});

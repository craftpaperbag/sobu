
Meteor.startup(function () {
console.log('startup')
  if (navigator.geolocation) {
    //Geolocation APIを利用できる環境向けの処理
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        console.log(pos)
        var x = pos.coords.longitude;
        var y = pos.coords.latitude;
        Meteor.call('getNearStation', x, y, function (err, s){
          if ( err ) {
            alert('エラー:駅名を取得できません');
            return;
          }
          console.log(s);
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
  }
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
  $('.help-container').addClass('active');
  $('#help').html('&times;');
};

function closeHelp() {
  $('.help-container').removeClass('active');
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
  // TODO use ID in js's selector
  "click .help-container": function () {
    if ( $('.help-container').hasClass('active') ) {
      closeHelp();
    }
  },
  "click #help": function () {
    if ( $('.help-container').hasClass('active') ) {
      closeHelp();
    } else {
      openHelp();
    }
  },
  "click #color-switcher": function () {
    toggleColor();
  }
});

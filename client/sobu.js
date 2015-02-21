
Meteor.startup(function () {
});


Template.station.helpers({
  kanji: function () {
    var s = Session.get("s");
    if ( s ) {
      return s.kanji; 
    } else {
      return "駅名";
    }
  },
  hiragana: function () {
    var s = Session.get("s");
    if ( s ) {
      return s.hiragana;
    } else {
      return "ぼたん　を　おしてください";
    }
  }
});

function randomEkiNum() {
  var num = Math.floor((Math.random() * 100000) % 39);
  return num;
}

Template.station.events({
  "click #change": function () {
    var num = randomEkiNum();
    var s = Stations.find({number: num}).fetch()[0];
    Session.set('s', s);
    console.log(num);
    console.log(s);
  },
});

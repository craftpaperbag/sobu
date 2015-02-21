//
// ekimei preparation
//

//
//
// remove all stations.
// only use for debug
//
// Stations.remove({});

if ( ! Stations.findOne() ) {
  console.log("Stations length is 0.");
  var txt = Assets.getText('ekimei.txt');
  var lines = txt.split("\n");
  for (var i in lines) {
    var tabs = lines[i].split("\t");
    if ( tabs.length !== 5 ) {
      console.log("length: " + tabs.length + " skip.(" + lines[i] + ")");
      continue;
    }
    var s = {
      number: Number(tabs[0]),
      kanji: tabs[1],
      x: Number(tabs[2]),
      y: Number(tabs[3]),
      hiragana: tabs[4],
      version: '0.0.1',
    }
    console.log(s);
    Stations.insert(s);
  }
  var length = Stations.find().count();
  console.log("Stations length now " + length);
}

Meteor.methods({
  getNearStation: function (x, y) {
    var nearest;
    var nearestDistancePow;
    var cursor = Stations.find({});
    cursor.forEach(function (s) {
      var distancePow = Math.pow(x - Number(s.x), 2) + Math.pow(y - Number(s.y), 2);
      if ( nearest === undefined || nearestDistancePow    >    distancePow) {
        nearestDistancePow = distancePow;
        nearest = s;
      }
    });
    return nearest;
  },
  getNextStation: function (s) {
    if ( ! s ) {
      return;
    }
    var ns = Stations.find({number: Number(s.number) + 1}).fetch()[0];
    if ( ! ns ) {
      return;
    }
    return ns;
  },
  getPrevStation: function (s) {
    if ( ! s ) {
      return;
    }
    var ps = Stations.find({number: Number(s.number) - 1}).fetch()[0];
    if ( ! ps ) {
      return;
    }
    return ps;
  },
});

Meteor.startup(function () {

});

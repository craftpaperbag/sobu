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
    console.log('getNearStation called');
    /*
    console.log('x: ' + x);
    console.log('y: ' + y);
    */
    var nearest;
    var nearestDistancePow;
    var cursor = Stations.find({});
    cursor.forEach(function (s) {
      // TODO: もっといい方法
      console.log('x: ' + x);
      console.log('s.x: ' + s.x);
      console.log('y: ' + y);
      console.log('s.y: ' + s.y);
      var distancePow = Math.pow(x - Number(s.x), 2) + Math.pow(y - Number(s.y), 2);
      console.log('target: ' + s.number + ' ' + s.kanji);
      console.log('target: ' + distancePow);
      console.log(                  nearestDistancePow + '>' + distancePow);
      if ( nearest === undefined || nearestDistancePow    >    distancePow) {
        console.log('*****************************nearer!: ' + s.kanji);
        nearestDistancePow = distancePow;
        nearest = s;
      }
      console.log('nearest_kanji: ' + nearest.kanji);
    });
    console.log('<result> nearest-kanji: ' + nearest.kanji);
    return nearest;
  },
});

Meteor.startup(function () {

});

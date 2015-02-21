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


Meteor.startup(function () {

});

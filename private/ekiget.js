console.log('get ekimei');

var request = require('request');
var fs = require('fs');

var qs = {
  method: "getStations",
  line: "JR総武線",
};

var opts = {
  url: "http://express.heartrails.com/api/json",
  qs: qs,
};

request(opts, function (err, response, body) {
  var result = JSON.parse(body);
  var rawStations = result.response.station;
  var filename = "ekimei.json";
  for (var i in rawStations) {
    var s = rawStations[i];
    console.log(i + ': ' + s.name + ' (' + s.x + ',' + s.y + ')');
    var ss = [i, s.name, s.x, s.y].join("\t"); // 最後によみがなを書き込む(人力)
    fs.writeFileSync(filename, ss);
  }
});

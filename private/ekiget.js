console.log('get ekimei');

var request = require('request');

var qs = {
  method: "getStations",
  line: "総武線",
};

var opts = {
  url: "http://express.heartrails.com/api/json",
  qs: qs,
};

request(opts, function (err, response, body) {
  var result = JSON.parse(body);
  console.log(body);
});

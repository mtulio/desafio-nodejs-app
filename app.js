var express = require('express');
var app = express();

var args_cli = {}
var args = {}

process.argv.forEach(function (val, index, array) {
  if (index % 2 == 0) {
    //console.log(index + ': ' + val);
    args_cli[val] = process.argv[index+1]
  }
});

args_app = {
	"port": args_cli['--production.port'] || 3000,
	"env": args_cli['--environment'] || 'dev'
}

app.get('/', function (req, res) {
  //res.send('Hello World!', Date.now());
  res.send('Hello World! ' + Date.now() || 0);
});


app.listen(args_app.port, function () {
  console.log('Sample App using env ' + args_app.env + ' listening on port ', args_app.port);
});


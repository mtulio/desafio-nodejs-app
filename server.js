var express = require('express');
var app = express();
var npid = require('npid');

var args_cli = {}
var args = {}

// Vars
process.argv.forEach(function (val, index, array) {
  if (index % 2 == 0) {
    //console.log(index + ': ' + val);
    args_cli[val] = process.argv[index+1]
  }
});

args_app = {
    "name": args_cli['--name'] || 'nodejs-server',
	"port": args_cli['--production.port'] || 3000,
	"env": args_cli['--environment'] || 'dev'
}

// Misc
try {
    var pid = npid.create((args_app.pidfile || "/var/run/" + args_app.name + "-%PORT%.pid").replace("%PORT%", args_app.port), true);
    pid.removeOnExit();
} catch (err) {
    console.log(err);
    process.exit(1);
}

// Server
app.get('/', function (req, res) {
  d = Date.now() || 0
  res.send('{"timestamp": '+ d + '}');
});

app.get('/internal/hello', function (req, res) {
  res.send('Hello World ['+ args_app.port +'] \n');
});

app.get('/internal/ping', function (req, res) {
  res.send('{"response": "pong"}');
});

app.listen(args_app.port, function () {
  console.log('Sample App using env ' + args_app.env + ' listening on port ', args_app.port);
});


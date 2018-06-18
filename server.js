var
	express = require('express');
	app = express();
	npid = require('npid');
	fs = require('fs');
	args_cli = {}
	args = {}
	config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

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
//> handlers
app.get('/', function (req, res) {
  d = Date.now() || 0
  res.send('{"timestamp": '+ d + ',"version": "'+ config.version +'"}');
});

app.get('/internal/hello', function (req, res) {
  res.send('{"Hello_Node": '+ args_app.port +'}');
});

app.get('/internal/ping', function (req, res) {
  res.send('{"response": "pong"}');
});

//> Bind && listen
app.listen(args_app.port, function () {
  console.log('Sample App using env ' + args_app.env + ' listening on port ', args_app.port);
});


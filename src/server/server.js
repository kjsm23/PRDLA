/**
 * Created by --- on 1/26/2017.
 */
var fs = require('fs'),
  http = require('http'),
  path = require('path'),
  methods = require('methods'),
  express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cors = require('cors'),
  passport = require('passport'),
  errorhandler = require('errorhandler'),
  mongoose = require('mongoose'),
  multer = require('multer');

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();
var db = mongoose.connection;






// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var originsWhitelist = [ 'http://localhost:4200']; // My front end

var corsOptions = {

  origin:function(origin,callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null,isWhitelisted);
  },
  credentials:true
}
app.use(cors(corsOptions));
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'PRDLA', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
  console.log('Prod');
} else {
  mongoose.connect('mongodb://localhost:27017/PRDLA');
  mongoose.set('debug', true);
  console.log('test');
}

require('./models/User');
require('./models/Photo');
require('./models/Comment');
require('./config/passport');


app.use(require('./routes/index'));

console.log('Connected');




db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});


  console.log('Connected to MongoDB');
// finally, let's start our node_server...
  var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + server.address().port);
  });

});




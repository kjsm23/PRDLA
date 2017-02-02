/*
var express =   require("express");
var multer  =   require('multer');
var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');
var upload = multer({dest: '../src/server/uploads/'})

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.post('/photo', auth.required, function(req, res, next) {


  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '../src/server/uploads/');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

  var upload = multer({storage: storage}).single('userPhoto');


  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

module.exports = router;
*/

/*
var express =   require("express");
var multer  =   require('multer');
var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');


var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, '/uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');


router.get('/upload', function (req, res) {
  res.end('file catcher example');
});

/** API path that will upload the files *//*
router.post('/upload',auth.required, function(req, res,next) {
  upload(req,res,function(err){
    console.log(req.file);
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null});

  }) .catch(next);;

});


module.exports = router;*/

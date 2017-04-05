/**
 * Created by --- on 1/26/2017.
 */
var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var multer  =  require('multer');
var auth = require('../auth');
var fs = require('fs');
var Group = mongoose.model('Group');
'use strict';
const nodemailer = require('nodemailer');





var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {

    console.log(req.payload.username);
    var dir = './img/user/upload/';
    dir = dir + req.payload.username + '/';
    if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    }

    cb(null,dir );

  },
  filename: function (req, file, cb) {

    console.log(req.payload.username);
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' +  req.payload.username + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

// // Function to verify usertype
// var needsGroup = function(usertipo){
//   return [
//     function (req,res,next) {
//       if(req.payload.username && req.payload.usertipo === usertipo)
//         next();
//       else {
//         console.log("Payload Username");
//         console.log(req.payload.username);
//         console.log("Res usertipo");
//         console.log(res.usertipo);
//         res.send(401, 'Unauthorized');
//       }
//     }
//   ];
// };

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
      user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    if(typeof req.body.user.usertipo !== 'undefined'){
      user.usertipo = req.body.user.usertipo;
    }

    if(typeof req.body.user.question1 !== 'undefined'){
      user.question1 = req.body.user.question1;
    }

    if(typeof req.body.user.question2 !== 'undefined'){
      user.question2 = req.body.user.question2;
    }

    if(typeof req.body.user.question3 !== 'undefined'){
      user.question3 = req.body.user.question3;
    }
    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

/*
router.post('/users/upload', function(req, res, next){

  console.log('Entre');
});*/


router.post('/users/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});

    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);

});

router.post('/users', function(req, res, next){
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.usertipo = req.body.user.usertipo;
  user.question1 = req.body.user.question1;
  user.question2 = req.body.user.question2;
  user.question3 = req.body.user.question3;


  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});


/*
router.get('/users/upload', function (req, res) {
  res.end('file catcher example');
});*/

/*
/** API path that will upload the files */
router.post('/users/upload',auth.required, function(req, res) {
  upload(req,res,function(err){

    console.log(req.payload.username);
    console.log(req.file.filename);

    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null,auth:this.auth, panoInfo: {user: req.payload.username, filename: req.file.filename }});

  });

});

/**Forgot Password path */
router.post('/users/forgot',auth.optional, function(req, res, next) {


  if (!req.body.user.email1) {
    return res.status(422).json({errors: {email1: "can't be blank"}});
  }

  if (!req.body.user.fquestion1) {
    return res.status(422).json({errors: {fquestion1: "can't be blank"}});
  }

  if (!req.body.user.fquestion2) {
    return res.status(422).json({errors: {fquestion2: "can't be blank"}});
  }

  if (!req.body.user.fquestion3) {
    return res.status(422).json({errors: {fquestion3: "can't be blank"}});
  }



  User.findOne({email: req.body.user.email1},{_id:0, question1: 1, question2:2, question3:3}, function (err,user){
    if(err) return handleError(err);
         if (!user) {
           console.log('error', 'No account with that email address exists.');
         }
    console.log('Question1',req.body.user.fquestion1);
    console.log('Query1',user.question1);
    console.log('Query2',user.question2);
    console.log('Query3',user.question3);

    console.log('Comparacion 1 ',req.body.user.fquestion1 === user.question1);
    console.log('Comparacion 2 ',req.body.user.fquestion2 === user.question2);
    console.log('Comparacion 3 ',req.body.user.fquestion3 === user.question3);

    console.log('Comparacion de las tres',req.body.user.fquestion1 === user.question1 && req.body.user.fquestion2 === user.question2 && req.body.user.fquestion3 === user.question3);

        if(req.body.user.fquestion1 === user.question1 && req.body.user.fquestion2 === user.question2 && req.body.user.fquestion3 === user.question3){

          var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
              user: 'kjsm23@hotmail.com',
              pass: 'xSamuraix'
            }
          });
          var mailOptions = {
            to: req.body.user.email1,
            from: 'kjsm23@hotmail.com',
            subject: 'PRDLA Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/'  + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          transporter.sendMail(mailOptions, function(err) {
           if(err){
             return console.log(err);
           }
          });

        }else
        {
          res.redirect('/forgot');
        }
  });


  (req, res, next);
});


// router.post('/forgot', function(req, res, next) {
//   async.waterfall([
//     function(done) {
//       crypto.randomBytes(20, function(err, buf) {
//         var token = buf.toString('hex');
//         done(err, token);
//       });
//     },function(token, done) {
//       User.findOne({ email: req.body.email }, function(err, user) {
//         if (!user) {
//           req.flash('error', 'No account with that email address exists.');
//           return res.redirect('/forgot');
//         }
//
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//
//         user.save(function(err) {
//           done(err, token, user);
//         });
//       });
//     },
//     function(token, user, done) {
//       var smtpTransport = nodemailer.createTransport('SMTP', {
//         service: 'SendGrid',
//         auth: {
//           user: '!!! YOUR SENDGRID USERNAME !!!',
//           pass: '!!! YOUR SENDGRID PASSWORD !!!'
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'passwordreset@demo.com',
//         subject: 'Node.js Password Reset',
//         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//         'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//         'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//         'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//       };
//       smtpTransport.sendMail(mailOptions, function(err) {
//         req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
//         done(err, 'done');
//       });
//     }
//   ], function(err) {
//     if (err) return next(err);
//     res.redirect('/forgot');
//   });
// });


module.exports = router;

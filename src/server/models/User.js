/**
 * Created by --- on 1/26/2017.
 */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config/index').secret;

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  question1: {type: String, required: [true, "can't be blank"]},
  question2: {type: String, required: [true, "can't be blank"]},
  question3: {type: String, required: [true, "can't be blank"]},
  bio: String,
  image: String,
  usertipo: String,
  hash: String,
  salt: String,

}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.comparequestion = function(fquestion1,fquestion2,fquestion3, cb) {

  bcrypt.compare(fquestion1, this.question1,fquestion2, this.question2,fquestion3,this.question3, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

//jwt.decode or jwt.verify

UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    usertipo: this.usertipo,
    question1: this.question1,
    question2: this.question2,
    question3: this.question3,
  };
};

UserSchema.methods.toProfileJSONFor = function(user){
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    usertipo: this.usertipo
  };
};


mongoose.model('User', UserSchema);

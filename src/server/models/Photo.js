/**
 * Created by --- on 1/26/2017.
 */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');
var Uid = require('node-uuid');

var PhotoSchema = new mongoose.Schema({
  slug: {type: String}, //, lowercase: true, unique: true
  title: String,
  description: String,
  pathPano: String,
  Glat: Number,
  Glong: Number,
  hotspot:[{}] ,
  transition: String,
  image: String, // añadi pa subir foto
  body: String,
  favoritesCount: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  //tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

PhotoSchema.plugin(uniqueValidator, {message: 'is already taken'});

PhotoSchema.pre('validate', function(next){
  this.slugify();

  next();
});

PhotoSchema.methods.slugify = function() {
  var bufferuuid = new Buffer(32);
  Uid.v4(null, bufferuuid, 16);
  this.slug =  Uid.unparse(bufferuuid); //slug(this.title);
};

PhotoSchema.methods.updateFavoriteCount = function() {
  var photo = this;

  return User.count({favorites: {$in: [photo._id]}}).then(function(count){
    photo.favoritesCount = count;

    return photo.save();
  });
};

PhotoSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    pathPano: this.pathPano,
    Glat: this.Glat,
    Glong: this.Glong,
    image: this.image,
    hotspot: this.hotspot,
    transition: this.transition,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    //tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Photo', PhotoSchema);

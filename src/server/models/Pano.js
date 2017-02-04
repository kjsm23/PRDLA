var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');


var PanoSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  path: String, 
  lat: Number,
  log: Number,
  hotspot:[{}] ,
  transition: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});


PanoSchema.plugin(uniqueValidator, {message: 'is already taken'});

PanoSchema.pre('validate', function(next){
  this.slugify();

  next();
});


PanoSchema.methods.slugify = function() {
  this.slug = slug(this.title);
};


PanoSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    path: this.path,
    Glat: this.Glat,
    Glong: this.Glong,
    hotspot: this.hotspot,
    transition: this.transition,
    //author: this.author.toProfileJSONFor(user)
  };
};
mongoose.model('Pano', PanoSchema);



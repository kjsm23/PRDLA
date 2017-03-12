/**
 * Created by --- on 3/11/2017.
 */

var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  body: String,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});



GroupSchema.methods.toJSONFor = function(user){
  return {
    body: this.body,
    group: this.group.toProfileJSONFor(user)
  };
};

mongoose.model('Group', GroupSchema);

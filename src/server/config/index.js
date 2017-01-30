/**
 * Created by --- on 1/26/2017.
 */
module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
};

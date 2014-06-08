/**
 * User
 *
 * @module      :: Model
 * @description :: Representation for Users within the system
 */
var User = {
  autoPK: true,
  attributes: {
  
  	fname: 'STRING',
  	lname: 'STRING',
  	DOB: 'DATE',
  	pNumber: {
  		type: 'STRING'
  	},
  	email: {
  		type: 'email',
  		required: true
  	},
  	multiplier: 'INTEGER',
  	accessLevel: 'INTEGER',
  	password: {
    	type: 'string',
    	minLength: 6,
    	required: true,
    	columnName: 'pass_hash'
    }
  },

  beforeCreate: function(values, cb) {
      var bcrypt = require("bcrypt");
      bcrypt.genSalt(10, function(err, salt) {
          if(err) return cb(err);

          bcrypt.hash(values.password, salt, function(err, hash) {
              if(err) return cb(err);
              values.password = hash;
              cb();
          });
      });
  },

};

module.exports = User;

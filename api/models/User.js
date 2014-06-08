/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

 attributes: {
  
  	fname: 'STRING',
  	lname: 'STRING',
  	DOB: 'DATE',
  	tele: {
  		type: 'INTEGER',
  		defaultsTo: '07123456789'
  	},
  	emailAddress: {
  		type: 'email',
  		required: true
  	},
  	multiplier: 'INTEGER',
  	accessLevel: 'STRING',
  	password: {
    	type: 'string',
    	minLength: 6,
    	required: true,
    	columnName: 'md5d_password'
    }
  }

  beforeCreate: function(values, next){
  	bcrypt.hash(values.password, 10, function(err, hash){
  		if(err) return next(err);
  		values.password = hash;
  		next();
  	});
  }
};

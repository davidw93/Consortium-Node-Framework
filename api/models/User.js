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

};

module.exports = User;

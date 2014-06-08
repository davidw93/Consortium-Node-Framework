/**
 * Timelog
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	id: 'INTEGER',
  	user_id: 'INTEGER',
  	time_recorded: 'DATETIME',
  	approved: 'BOOLEAN',
  	approved_by: 'INTEGER',
  	project_id: 'INTEGER',
  	updated_on: 'DATETIME'
  }

};

/**
 * Client
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var Client = {
    autoPK: true,
	attributes: {
		company_name: 'STRING',
		website: 'STRING',
		address: 'STRING'
	}
};

module.exports = Client;

/**
 * Client
 *
 * @module      :: Model
 * @description :: External Clients within the system.
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

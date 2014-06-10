/*
 *      Script Name:    ClientContactController.js
 *      Status:         Implemented
 *      Access URL:     <prefix>/ClientContact/
 *      Author: 		Thundercatz
 		Script Usage:
 *          Script is for CRUD operations on Client Contacts within the system
 *			Script will be used to return a link between User and Client, to enable
 *			access to Client<->User correspondance
 *		
 */

var ClientContactController = {

	/*
	*		-- ACCESSIBLE BY ALL --
	*		create(req, res)
	*
	*		This function will create a link between a client and a user via their respective id's
	*		, it will facilitate the viewing of which users will handle which clients
	*/
	create: function(req, res){
		var client_id = req.param("client id");
		var contact_id = req.param("contact_id");
		var possible = false;
		
		// Checks to validate the client ID that was entered
		// If an general error occurs a 500 debug / Server error will be thrown
		// Or if the client is just undefined a validation error will be thrown
		// otherwise it passes validation 
		Client.findOne(client_id).exec(function(err, client){
			if(err) return res.send(err, 500);
			if(client === undefined) res.send(err, 400);
		});
		
		// 2nd validation here with the user this time
		// General error occurs - 500 Server error will be thrown
		// User undefined will result in a 400 validation error being thrown
		// otherwise it passes validation
		User.findOne(contact_id).exec(function(err, user){
			if(err) return res.send(err, 500);
			if(user === undefined) return res.send(err, 400);
		});

		// If everything has been validated then the contact between Client and User
		// Will be created
		ClientContact.create({
			client_id: client_id,
			contact_id: contact_id
		}).exec(function(err, clientcontact){
			if(err) return res.send(err, 500);
			return res.json(clientcontact);
		});
	},

	/*
	*		-- ACCESSIBLE BY ALL --
	*		destroy(req, res)
	*
	*		This function will destroy a link between a client and a user via their respective id's
	*/
	destroy: function(req, res){
		var client_id = req.param('client_id');
		var contact_id = req.param('contact_id');

		if(client_id && contact_id){
			ClientContact.destroy({
				client_id: client_id,
				contact_id: contact_id	
			}).done(function(err, contact){
				if(err) return res.send(err, 500);
				return res.json("Contact Deleted");
			});
		}
	},

	/*
	*		-- ACCESSIBLE BY ALL --
	*		all(req, res)
	*
	*		This function will return all ClientContact's as JSON formatted Objects
	*/
	all: function(req, res){
		ClientContact.find().done(function(err, contacts){
			res.json(contacts);
		});
	}

};

module.exports = ClientContactController;

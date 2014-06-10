/*
 *      Script Name:    ProjectController.js
 *      Status:         Partially Implemented
 *      Access URL:     <prefix>/Project/
 *      Script Usage:
 *          Script is for CRUD operations on Projects within the system
 *			Script is for retrieving data on projects as a linker to the
 *			projects information.
 */

var ProjectController = {


	/*
	*	-- ACCESSIBLE TO ALL --
	*	create(req, res).
	*
	*	Creates a new Project Object.
	*/
	create: function(req, res){
		// Get variables for creating - Keeping in line with DRY principles
		var data = ProjectController.getCreateVariables(req);

		// Validate clients existence.
		Client.findOne(data.client_id).done(function(err, client){
			if(err)
			 return res.send(err, 500);
			if(client === undefined)
				return res.json({"Msg" : "Client does not exist"});
		});

		// Create new project with request data
		Project.create({
			client_id: data.client_id,
			price: data.price,
			description: data.description,
			notes: data.notes
		}).done(function(err, project){
			if(err) 
				return res.send(err, 500);
			return res.json(project);
		});
	},

	/*
	*	-- ACCESSIBLE TO NONE --
	*	--  UTILITY FUNCTION  --
	*	getCreateVariables(req).
	*
	*	Takes all request variables and returns them as an array
	*/

	getCreateVariables: function(req){
		var returnData = {
			client_id : req.param("client_id"),
			price : req.param("price"),
			description : req.param("description"),
			notes : req.param("notes")
			};
		return returnData;
	},

	/*
	*	-- ACCESSIBLE TO ALL --
	*	destroy(req, res);
	*	
	*	Destroys the project object specified by the id parameter.
	*/
	destroy: function(req, res){
		var id = req.param('id');

		Project.destroy({
			id: id
		}).exec(function(err){
			if(err) 
				return res.send(err, 500);
		});
		return res.json({"msg": "Success"});
	},

	/*
	*	-- ACCESSIBLE TO ALL --
	*	all(req, res);
	*	
	*	Returns all Projects as JSON formatted objects
	*/
	all: function(req, res){

		Project.find().exec(function(err, projects){
			if(err) 
				return res.send(err, 500);
			return res.json(projects);
		});
	},

	/*
	*	-- ACCESSIBLE TO ALL --
	*	find(req, res);
	*	
	*	Returns the Project Object specified by ID as a JSON formatted Object
	*/
	find: function(req, res){
		var id = req.param("id");
		Project.findOne(id).exec(function(err, project){
			if(err) 
				return res.send(err, 500);
			if(project === undefined) 
				return res.json({"Msg" : "Project does not exist"});
			return res.json(project);
		});
	}
}

module.exports = ProjectController;

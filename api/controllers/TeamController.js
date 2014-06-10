/*
 *      Script Name:    TeamController.js
 *      Status:         Not Implemented
 *      Access URL:     <prefix>/Team/
 *      Script Usage:
 *          Script is for CRUD operations on Team within the system
 */

var TeamController = {
	
	/*
	* 	-- ACCESSIBLE TO ALL --
	*	create(req, res)
	*
	*	Creates a new Team object using the data from req
	**/
	create: function(req, res){
		// Retrieve data from request object. Keeping inline with DRY principles
		var data = TeamController.getCreateVariables(req);

		//Find and validate user
		User.findOne({
			id: data.team_lead_id
		}).exec(function(err, user){
			if(err) return res.send(err, 500);
			if(user === undefined) return res.json({success: false + " User is not defined", error: err});

			//Find and validate project
			Project.findOne({
				id: data.project_id
			}).exec(function(err, project){
				if(err) return res.send(err, 500);
				if(project === undefined) return res.json({success: false + "Project is not defined", error: err});

				//After passing validation - Create Team
				Team.create({
					project_id : data.project_id,
					team_lead_id : data.team_lead_id
				}).exec(function(err, team){
					if(err) return res.json({success : false});
					return res.json(team);
				});
			});
		});		
	},
	
	/*
	* 	-- ACCESSIBLE TO ALL --
	*	destroy(req, res)
	*
	*	Destroys the team identified by its ID
	**/
	destroy: function(req, res){
		var data = TeamController.getCreateVariables(req);

		Team.findOne({
			id : data.id
		}).exec(function(err){
			if(err) return res.json({success: false + " 500 Error"});
			Team.destroy(data.id).exec(function(err){
				if(err) return res.json({success: false + "Failed to destroy team"});
				return res.json({success: true});
			});
		});

	},
	
	/*
	* 	-- ACCESSIBLE TO ALL --
	*	getCreateVariables(req)
	*
	*	Returns an array of variables necessary for
	*	creating a new team object
	**/
	getCreateVariables: function(req){

		var returnData = {
			id : req.param("id"),
			project_id : req.param("project_id"),
			team_lead_id : req.param("team_lead_id")
		};
		return returnData;
	},
	
	/*
	* 	-- ACCESSIBLE TO ALL --
	*	getProject(req, res)
	*
	*	Returns the project matching the requested ID
	**/
	getProject: function(req, res){

		Project.findOne({
			id : req.param("project_id")
		}).exec(function(err, project){
			if(err) return res.json({success: false + "Error 500 occurred"});
			if(project === undefined) return res.json({success: false + "Project is undefined"});
			return res.json(project);
		});
	},
	
	/*
	* 	-- ACCESSIBLE TO ALL --
	*	getTeamLead(req, res)
	*
	*	Returns the team lead matching the requested ID
	**/
	getTeamLead: function(req, res){


		User.findOne({
			id : req.param("team_lead_id")
		}).exec(function(err, user){
			if(err) return res.json({success: false + "Error 500 occurred"});
			if(user === undefined) return res.json({success: false + "User is undefined"});
			return res.json(user);
		});
	}
}

module.exports = TeamController;

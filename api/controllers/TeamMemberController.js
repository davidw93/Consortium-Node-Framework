/*
 *      Script Name:    TeamMemberController.js
 *      Status:         Not Implemented
 *      Access URL:     <prefix>/TeamMember/
 *      Script Usage:
 *          Script is for CRUD operations on TeamMembers within the system
 */

var TeamMemberController = {
	
	/*
	* 	-- ACCESSIBLE TO ALL --
	*	create(req, res)
	*
	*	Creates a new Team object using the data from req
	**/
	create: function(req, res){

		var data = TeamMemberController.getCreateVariables();

		Team.findOne(data.team_id).exec(function(err, team){
			if(err) return res.json({success: false});
			if(team === undefined) return res.json({success: false});

			User.findOne(data.user_id).exec(function(err, user){
				if(err) return res.json({success: false});
				if(user === undefined) return res.json({success: false});

				TeamMember.create({
					team_id : data.team_id,
					user_id : data.user_id
				}).exec(function(err, teammember){
					if(err) return res.json({success: false});
					if(teammember === undefined) return res.json({success: false});
					return res.json(teammember);
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

		var data = TeamMemberController.getCreateVariables();

		if(data.id){
			TeamMember.destroy(data.id).exec(function(err){
				if(err) return res.json({success: false});
				return res.json({success: true});
			});
		}
	},

	/*
	*	-- ACCESSIBLE TO ALL --
	*	all(req, res)
	*
	*	Returns all team member objects as JSON formatted objects
	**/
	all: function(req, res){

		TeamMember.find().exec(function(err, teamMembers){
			if(err) return res.json({success: false});
			return res.json(teamMembers);
		});
	},

	/*
	*	-- ACCESSIBLE TO ALL --
	*	find(req, res)
	*
	*	Returns a Team Member Object defined by the id requested
	**/
	find: function(req, res){

		var data = TeamMemberController.getCreateVariables();
		TeamMember.findOne(data.id).exec(function(err, teamMember){
			if(err) return res.json({success: false});
			if(teamMember === undefined) return res.json({success: false});
			return res.json(teamMember);
		});
	},
	
	/*
	* 	-- ACCESSIBLE TO ALL --
	*	getCreateVariables(req)
	*
	*	Returns an array of variables necessary for
	*	creating a new team object
	**/
	getCreateVariables: function(req, res){

		var returnData = {
			id : req.param("id"),
			team_id : req.param("team_id"),
			user_id : req.param("user_id")
		};
		return returnData;
	}
}

module.exports = TeamMemberController;

/*
 *      Script Name:    UserRatingController.js
 *      Status:         Not Implemented
 *      Access URL:     <prefix>/UserRating/
 *      Script Usage:
 *          Script is for CRUD operations on User Ratings within the system
 */

var UserRatingController = {
	/*
	*   -- ACCESSIBLE TO ALL --
	*   create(req, res)
	*
	*   Creates a new UserRatings object
    *   Will return either new UserRatings object in JSON format
    *   or a failure flag.   
	**/
	create: function(req, res){

        var data = UserRatingController.getCreateVariables(req);

        // First check that a rating doesn't exist for the user on requested project
        UserRating.findOne({
            project_id : data.project_id,
            user_id : data.user_id
        }).done(function(err, userrating){
            if(err) return res.json(err, 500);
            if(userrating === undefined){
                // UserRating does not exist so we can go ahead and create one
                UserRatingController.createUtility(data, res);
            }
            /* Fall to here if userRating is defined and no error has occured
            Meaning that the userRating does already exist*/
            UserRatingController.destroy(req, res).done(function(err){
                UserRatingController.createUtility(data, res);
            });
        });
    },
    
    /*
    *   -- ACCESSIBLE TO ALL --
    *   createUtility(data, res)  
    *
    *   This function is to carry out the actual creation process
    *   of a UserRating. This enforces DRY principles
    **/
    createUtility: function(data, res){

        Project.findOne(data.project_id).done(function(err, project){
            if(err) return res.send(err, 500);
            if(project === undefined) return res.send(err, 400);
            // Fall through to here if the project exists
            User.findOne(data.user_id).done(function(err, user){
                if(err) return res.send(err, 500);
                if(user === undefined) return res.send(err, 400);
                // Fall through to here if both project and user exist
                UserRating.create({
                    project_id : data.project_id,
                    user_id : data.user_id,
                    time_management : data.time_management,
                    quality_of_work : data.quality_of_work,
                    team_skills : data.team_skills, 
                    notes : data.notes
                }).success(function(err, userrating){
                    if(err) return res.send(err, 500);
                    return res.json(userrating);
                });       
            });
        }); 
    },


    /*
    *   -- ACCESSIBLE TO ALL --
    *   destroy(req, res)
    *
    *   Destroys the UserRating object specified by ID
    *   Will return a Success or Fail flag  
    **/
	destroy: function(req, res){

        var data = UserRatingController.getCreateVariables(req);

        UserRating.findOne({
            project_id : data.project_id,
            user_id : data.user_id
        }).done(function(err, userRating){
            if(err) return res.send(err, 500);
            if(userRating === undefined) return res.send(err, 400);

            // We can assume that UserRating was found by this point
            UserRating.destroy({
                project_id : data.project_id,
                user_id : data.user_id
            }).success(function(err){
                if(err) return res.send(err, 500);
                return res.json({success : true});
            });
        });
    },

    /*
    *   -- ACCESSIBLE TO ALL --
    *   find(req, res)  
    *
    *   Finds the UserRating object identified by the project ID and User ID
    *   Returns as a JSON formatted object
    **/
	find: function(req, res){

        var data = UserRatingController.getCreateVariables(req);


        // find by project id and user id
        if(data.project_id && data.user_id){
            UserRating.findOne({
                project_id : data.project_id,
                user_id : data.project_id
            }).done(function(err, userRating){
                if(err) return res.send(err, 500);
                if(userRating === undefined) return res.send(err, 400);
                return res.json(userRating);
            });
        }
        // Find by just user_id
        if(data.user_id){
            UserRating.findOne({
                user_id : data.project_id
            }).done(function(err, userRating){
                if(err) return res.send(err, 500);
                if(userRating === undefined) return res.send(err, 400);
                return res.json(userRating);
            });
        }
    },

    /*
    *   -- ACCESSIBLE TO ALL --
    *   all(res)  
    *
    *   returns all UserRating objects as JSON formatted objects
    **/
	all: function(){

        UserRating.find().done(function(err, userRatings){
            if(err) return res.send(err, 500);
            return res.json(userRatings);
        });
    },

    /*
    *   -- ACCESSIBLE TO ALL --
    *   getCreateVariables(req) 
    *   
    *   Parses and returns data extracted from the req object
    **/
    getCreateVariables: function(req){
        var returnData = {
            project_id : req.param("project_id"),
            user_id : req.param("user_id"),
            time_management : req.param("time_management"),
            quality_of_work : req.param("quality_of_work"),
            team_skills : req.param("team_skills"),
            notes : req.param("notes")
        };

        return returnData;
    }
	
}

/* Just boom.. */

module.exports = UserRatingController;

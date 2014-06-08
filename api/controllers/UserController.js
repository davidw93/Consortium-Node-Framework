/*
 *      Script Name:    UserController.js
 *      Status:         Partially Implemented
 *      Access URL:     <prefix>/User/
 *      Script Usage:
 *          Script is for CRUD operations on Users within the system
 */

var UserController = {


    createRegular: function(req, res) {
        //Get the data from the request. DRY Pattern.
        var data = UserController.getCreateVariables(req);
        UserController.create(data, 1, 1, res);
    },

    createBoardMember: function(req, res) {
        var data = UserController.getCreateVariables(req);
        UserController.create(data, 1, 2, res);
    },


    findAll: function(req, res){
        User.find().done(function(err, users) {
            if(err) return res.send(err, 500);
            return res.json(users);
        });
    },

    findUser: function(req, res){
        var userID = req.param('id');
        var userFName = req.param('fname');
        var userLName = req.param('lname');

        if(userID){
            User.findOne(userID, function(err, user){
        
                //if user cannot be found then not found will be sent as a response
                if(user === undefined) return res.json("message", "Not Found");
                //if there was an error we pass through and return the error
                if(err) return next(err);

                //we fall to this if everything passes and it will return a json formatted user object
                res.json(user);
            });
        }
    },

    //Access blocked in policies -- ALL REQUESTS
    getCreateVariables: function(req) {
        var returnData = {
            fname : req.param("fname"),
            lname : req.param("lname"),
            dob : req.param("dob"),
            phone : req.param("phone_number"),
            email : req.param("email"),
            password : req.param("password")
        };
        return returnData;
    },

    //Access blocked in policies - ALL REQUESTS
    create: function(user_data, multiplier, accessLevel, res){
        User.create({
            fname: user_data.fname,
            lname: user_data.lname,
            DOB: user_data.dob,
            pNumber: user_data.phone,
            email: user_data.email,
            multiplier: multiplier,
            accessLevel: accessLevel,
            password: user_data.password
        }).done(function(err, user){
            if(err) return res.send(err, 500); // err 500 with the error for debugging
            return res.json(user); // return the user object as a JSON object
        });
    }
};


module.exports = UserController;

/*
 *      Script Name:    UserController.js
 *      Status:         Partially Implemented
 *      Access URL:     <prefix>/User/
 *      Script Usage:
 *          Script is for CRUD operations on Users within the system
 */

var UserController = {

    /*
     *      -- ACCESSIBLE BY ALL --
     *      createRegular(req, res):
     *          Extracts user creation data from received request and creates a User
     *          in the system with their details. This function only creates regular access level users.
     */
    createRegular: function(req, res) {
        //Get the data from the request. DRY principles.
        var data = UserController.getCreateVariables(req);
        UserController.create(data, 1, 1, res);
    },

    /*
     *      -- ACCESSIBLE BY ALL --
     *      createBoardMember(req, res):
     *          Extracts user creation data from received request and creates a User
     *          in the system with their details. This function only creates board member access level users.
     */
    createBoardMember: function(req, res) {
        //Get the data from the request. DRY principles.
        var data = UserController.getCreateVariables(req);
        UserController.create(data, 1, 2, res);
    },


    /*
     *      -- ACCESSIBLE BY ALL --
     *      all(req, res):
     *          Returns all users within the system.
     */
    all: function(req, res){
        User.find().done(function(err, users) {
            if(err) return res.send(err, 500);

            //Set up socket.io to broadcast changes of this model
            User.subscribe(req.socket);
            User.subscribe(req.socket, users);

            return res.json(users);
        });
    },

    /*
     *      -- ACCESSIBLE BY ALL --
     *      find(req, res):
     *          if "id" is present:
     *              Return user with specified ID
     *          if "fname" and "lname" are present:
     *              Return user with that specified first and last name
     *          if only "fname" is present:
     *              Return the first user that has that specified first name
     *          if only "lname" is present:
     *              Return the first user that has that specified last name
     *
     *          if no users are found then return a JSON error message.
     */
    find: function(req, res){
        var userID = req.param('id');
        var userFName = req.param('fname');
        var userLName = req.param('lname');

        if(userID){
            User.findOne(userID, function(err, user){
                //if there was an error we pass through and return the error
                if(err) return res.send(err, 500);

                //if user cannot be found then not found will be sent as a response
                if(user === undefined) return res.json({"msg":"Not Found"});

                //Set up socket.io to broadcast changes specifically for this user
                User.subscribe(req.socket, user);

                //we fall to this if everything passes and it will return a json formatted user object
                return res.json(user);
            });
        }

        if(userFName && userLName) {
            //Find the user using their first AND last name
            User.findOne({
                fname: userFName,
                lname: userLName
            }).done(function(err, user) {
                if(err) return res.send(err, 500);
                if(user == undefined) return res.json({"msg": "Not Found"});

                //Set up socket.io to broadcast changes specifically for this user
                User.subscribe(req.socket, user);

                return res.json(user);
            });
        } else if(userFName) {
            //Find the user using only their first name
            User.findOne({
                fname: userFName
            }).done(function(err, user) {
                if(err) return res.send(err, 500);
                if(user === undefined) return res.json({"msg": "Not Found"});

                //Set up socket.io to broadcast changes specifically for this user
                User.subscribe(req.socket, user);

                return res.json(user);
            });
        } else if(userLName) {
            //Find the user using only their last name
            User.findOne({
                lname: userLName
            }).done(function(err, user) {
                if(err) return res.send(err, 500);
                if(user === undefined) return res.json({"msg": "Not Found"});

                //Set up socket.io to broadcast changes specifically for this user
                User.subscribe(req.socket, user);

                return res.json(user);
            });
        }

    },

    /*
     *      -- ACCESSIBLE BY NONE --
     *      getCreateVariables(req):
     *          Helper function to split out request parameters required for
     *          user creation.
     */
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

    /*
     *      -- ACCESSIBLE BY NONE --
     *      create(user_data, multiplier, accessLevel, res):
     *          Create new user in system using specified user_data, multiplier,
     *          and accessLevel. Write results of operation back to res object.
     */
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
            User.publishCreate(user);
            return res.json(user); // return the user object as a JSON object
        });
    },

    increaseMultiplier: function(req, res){
        var byAmount = req.param("by_amount");
        var UID = req.param("user_id");

        //Find user and increment their multiplier
        User.findOne({
            id: UID
        }).done(function(err, user){
            if(err) return res.send(err, 500);
            if(user === undefined) return res.json({"MSG" : "Failure"});

            user.multiplier = user.multiplier + byAmount;
            user.save(function(err) {
                if(err) return res.send(err, 500);

                User.publishUpdate(user.id, {
                    multiplier: user.multiplier
                });
                return res.json({"MSG" : "Success"});
            });
        });
    },

    doesExist: function(id){

        User.findOne(id, function(err, user){
            if(err) return res.send(err, 500);
            if(user === undefined) return res.json("User Not Found");

            return res.json(user);
        });
    }
};


module.exports = UserController;

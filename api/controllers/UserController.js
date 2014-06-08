/*
 *      Script Name:    UserController.js
 *      Status:         Partially Implemented
 *      Access URL:     <prefix>/User/
 *      Script Usage:
 *          Script is for CRUD operations on Users within the system
 */

var UserController = {

    create: function(req, res){
        var fname = req.param("fname");
        var lname = req.param("lname");

        User.create({
            fname: fname,
            lname: lname,
            DOB: "12/01/1992",
            pNumber: "07807587773",
            email: "daveycis@gmail.com",
            multiplier: 10,
            accessLevel: "2",
            password: "password"
        }).done(function(err, user){
            if(err) return res.send(err, 500); // err 500 with the error for debugging
            return res.json(user); // return the user object as a JSON object
        });
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
    }
}

module.exports = UserController;

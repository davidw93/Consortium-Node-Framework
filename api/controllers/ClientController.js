//ClientController.js

var ClientController = {
    create: function(req, res) {
        var cname = req.param("company_name");
        var website = req.param("website");

        Client.create({
            company_name: cname,
            website: website,
            address: "testing because cba with that param"
        }).done(function(err, client) {
            if(err) return res.send(err, 500); //err 500 with the error for debugging
            return res.json(client); //return the client object as a JSON object
        });
    },
    destroy: function(req, res) {
        var cid = req.param("company_id");
        var company_name = req.param("company_name");

        if(cid) {
            //Operating on company id for the DB operations
            Client.destroy({
                id: cid
            }).done(function(err) {
                if(err) return res.send(err, 500);
            });
            return res.json({"msg": "success"}); //Success so return a msg to indicate that

        } else if(company_name) {
            //Operating on company name for the DB operations
            Client.destroy({
                company_name: company_name
            }).done(function(err) {
                if(err) return res.send(err, 500);
            });
            return res.json({"msg": "success"}); //Success so return a msg to indicate that
        }

        //Fall through to this if we don't get a company_id or company_name
        //given to us to use for the DB work.
        return res.json({"msg": "failure, invalid paramaters to function"});
    }
};

module.exports = ClientController;

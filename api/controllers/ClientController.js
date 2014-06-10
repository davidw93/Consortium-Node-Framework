/*
 *      Script Name:    ClientController.js
 *      Status:         Partially Implemented
 *      Access URL:     <prefix>/Client/
 *      Script Usage:
 *          Script is for CRUD operations on Clients within the system
 */

var ClientController = {

    /*
     *      -- ACCESSIBLE BY BOARD --
     *      create(req, res):
     *          
     *      Extracts the parameters required for a client and creates a new client object.
     *      This function creates a standard client (only one kind in the system)
     */
    create: function(req, res) {
        var cname = req.param("company_name");
        var website = req.param("website");
        var address = req.param("address");

        Client.create({
            company_name: cname,
            website: website,
            address: address
        }).done(function(err, client) {
            if(err) return res.send(err, 500); //err 500 with the error for debugging
            return res.json(client); //return the client object as a JSON object
        });
    },

    /*
     *      -- ACCESSIBLE BY BOARD --
     *      destroy(req, res):
     *          
     *      Extracts data to identify which client is to be destroyed,
     *      This function destroys the client identified by the parameters passed to it
     */
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
    },

    /*
     *      -- ACCESSIBLE BY ALL --
     *      find(req, res):
     *          
     *      Will return all clients in the system meeting the requirements set by parameter(s)
     */
    find: function(req, res){
        var clientID = req.param('id');
        var company_name = req.param('company_name');        

        if(clientID){
            Client.findOne(clientID, function(err, client){
                // If error detected, send back server error
                // Then carry out check on client equalling null or whether its undefined for specified id
                if(err) return res.send(err, 500);
                if(client === undefined) return res.json("Client not found..");

                // Client must exist - So return client
                return res.json(client);
            });
        }
    },

    /*
     *      -- ACCESSIBLE BY ALL --
     *      findAll(req, res):
     *          
     *      Will return all clients in the system
     */
    findAll: function(req, res){

        Client.find().done(function(err, clients){
            res.json(clients);
        });
    },

    doesExist: function(id){

        Client.findOne(id, function(err, client){
            if(err) return res.send(err, 500);
            if(client === undefined) return res.json("Client Not Found");

            return res.json(client);
        });
    }
};

module.exports = ClientController;

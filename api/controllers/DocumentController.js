/*
 *      Script Name:    DocumentController.js
 *      Status:         Partially Implemented
 *      Access URL:     <prefix>/Document/
 *      Script Usage:
 *          Script is for CRUD operations on Documents within the system
 *          Script will handle the Document Revision Functionality
 *          Script will handle Management Document Functionality
 *          Script will handle Project Document Functionality
 */

var UUIDGenerator   = require("node-uuid"),
    path            = require("path"),
    fs              = require("fs");

function getExtension(filename) {
    var ext = path.extname(filename||"").split(".");
    return ext[ext.length - 1];
}

var DocumentController = {

    uploadManagement: function(req, res) {
        var filesUploaded = req.files;
        async.forEach(Object.keys(filesUploaded), function(fileKey, cb) {
            var file = filesUploaded[fileKey];

            async.auto({

                //Calculate the new file's path and generate a unique UUID with
                //the old extension to ensure apporpriate storage.
                metadata: function(cb) {
                    var uuid = UUIDGenerator.v1(),
                        newFileName = uuid + "." + getExtension(file.name),
                        newPath = __dirname + "/../../public/files/" + newFileName;

                    cb(null, {
                        uuid: uuid,
                        newFileName: newFileName,
                        newPath: newPath
                    });
                },

                //Read the temporary file that's been uploaded
                readFile: function(cb, result) {
                    fs.readFile(file.path, cb);
                },

                //Save all the document's details to the database
                //[TODO] - Revise
                saveToDB: ['metadata', function(cb, result) {
                    Document.create({
                        type: 1
                    }).done(function(err, doc_master_link) {
                        if(err) return cb(err);
                        DocumentRevision.create({
                            doc_id: doc_master_link.id,
                            location: result.metadata.newPath,
                            rev_number: 1,
                        }).done(function(f) {
                            cb(f);
                        });
                    });
                }],

                //Write the file to it's destination with new UUID filename
                writeFile: ['readFile', 'metadata', function(cb, result) {
                    fs.writeFile(result.metadata.newPath, result.readFile, cb);
                }]

            }, function(err, results) {
                //Call main forEach's callback method
                cb(err, results);
            });

        //forEach callback. Respond to the user's request here
        }, function(err) {
            if(err) return res.json({success: false, error: err});
            return res.json({success: true});
        });
    }
}

module.exports = DocumentController;

/**
 * Document
 *
 * @module      :: Model
 * @description :: Serves as a reference point for master document aggregation
 */

var Document = {
    autoPK: true,
    attributes: {
        type: 'INTEGER', //1 for project document, 2 for management document
        link: 'INTEGER' //The project id or management meeting id for document
    }
};

module.exports = Document;

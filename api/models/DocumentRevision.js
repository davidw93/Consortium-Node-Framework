/**
 * DocumentRevision
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 */

var DocumentRevision = {
    autoPK: true,
    attributes: {
        doc_id: 'INTEGER',
        location: 'STRING',
        rev_number: 'INTEGER',
        updated_on: 'DATETIME'
    }
};

module.exports = DocumentRevision;

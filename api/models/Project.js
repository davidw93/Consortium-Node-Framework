/**
 * Project
 *
 * @module      :: Model
 * @description :: Projects within the system relating to external clients
 */

var Project = {
    autoPK: true,
    attributes: {
        client_id: 'INTEGER',
        price: 'FLOAT',
        description: 'STRING',
        notes: 'STRING'
    }
};

module.exports = Project;

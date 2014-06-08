/**
 * ClientContacts
 *
 * @module      :: Model
 * @description :: Contact points for clients
 */

var ClientContact = {
    autoPK: true,
    attributes: {
        client_id: 'INTEGER',
        contact_id: 'INTEGER'
    }
};

module.exports = ClientContact;

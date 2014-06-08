/**
 * TeamMember
 *
 * @module      :: Model
 * @description :: Linkage between teams and users within the system
 */

var TeamMember = {
    autoPK: true,
    attributes: {
        team_id: 'INTEGER',
        user_id: 'INTEGER'
    }
};

module.exports = TeamMember;

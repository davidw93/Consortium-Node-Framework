/**
 * Team
 *
 * @module      :: Model
 * @description :: Linkage of teams to projects with a clearly defined project
 * leader
 */

var Team = {
    autoPK: true,
    attributes: {
        project_id: 'INTEGER',
        team_lead_id: 'INTEGER'
    }
};

module.exports = Team;

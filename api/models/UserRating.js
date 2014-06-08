/**
 * UserRating
 *
 * @module      :: Model
 * @description :: Rating for a user on a project. Used to define their
 * weighting/multiplier
 */

var UserRating = {
    autoPK: true,
    attributes: {
        project_id: 'INTEGER',
        user_id: 'INTEGER',
        time_management: 'INTEGER',
        quality_of_work: 'INTEGER',
        team_skills: 'INTEGER',
        notes: 'STRING'
    }
};

module.exports = UserRating;

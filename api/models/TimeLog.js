/**
 * TimeLog
 *
 * @module      :: Model
 * @description :: Logs of time spent by users on projects
 */

var TimeLog = {
    autoPK: true,
    attributes: {
        user_id: 'INTEGER',
        time_recorded: 'DATETIME',
        approved: 'BOOLEAN',
        approved_by: 'INTEGER',
        project_id: 'INTEGER',
    }
};

module.exports = TimeLog;

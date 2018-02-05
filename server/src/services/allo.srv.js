let db = require('../db.js');

module.exports.findAll = (success, error) => {

    let query = 'SELECT * FROM allo';

    db.connection.query(query, (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findActive = (success, error) => {

    let query = 'SELECT * FROM allo WHERE active = 1';

    db.connection.query(query, (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findActiveWithId = (id, success, error) => {

    let query = 'SELECT * FROM allo WHERE active = 1 AND id = ?';

    db.connection.query(query, [id], (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findWithId = (id, success, error) => {

    let query = 'SELECT * FROM allo WHERE id = ?';

    db.connection.query(query, [id], (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.updateActive = (id,state, success, error) => {

    let query = 'UPDATE allo SET active = ? WHERE id = ?';

    db.connection.query(query, [state,id], (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};
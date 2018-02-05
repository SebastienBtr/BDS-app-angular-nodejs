'use strict';

var db = require('../db.js');

module.exports.findAll = function (success, error) {

    var query = 'SELECT * FROM allo';

    db.connection.query(query, function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findActive = function (success, error) {

    var query = 'SELECT * FROM allo WHERE active = 1';

    db.connection.query(query, function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findActiveWithId = function (id, success, error) {

    var query = 'SELECT * FROM allo WHERE active = 1 AND id = ?';

    db.connection.query(query, [id], function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findWithId = function (id, success, error) {

    var query = 'SELECT * FROM allo WHERE id = ?';

    db.connection.query(query, [id], function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.updateActive = function (id, state, success, error) {

    var query = 'UPDATE allo SET active = ? WHERE id = ?';

    db.connection.query(query, [state, id], function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};
//# sourceMappingURL=allo.srv.js.map
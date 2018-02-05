'use strict';

var db = require('../db.js');

module.exports.findWithAlloId = function (alloId, success, error) {

    var query = 'SELECT * FROM specification WHERE alloId = ?';

    db.connection.query(query, [alloId], function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findWithId = function (id, success, error) {

    var query = 'SELECT * FROM specification WHERE id = ?';

    db.connection.query(query, [id], function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};
//# sourceMappingURL=specification.srv.js.map
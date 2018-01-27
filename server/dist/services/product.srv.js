'use strict';

var db = require('../db.js');

module.exports.findAll = function (success, error) {

    var query = 'SELECT * FROM product ORDER BY price';

    db.connection.query(query, function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findById = function (id, success, error) {

    var query = 'SELECT * FROM product WHERE id = ? ORDER BY price';

    db.connection.query(query, [id], function (err, rows) {

        if (!err) {
            success(rows[0]);
        } else {
            console.error(err);
            error(err);
        }
    });
};
//# sourceMappingURL=order.srv.js.map
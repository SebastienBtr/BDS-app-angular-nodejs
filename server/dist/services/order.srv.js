'use strict';

var db = require('../db.js');

module.exports.findAll = function (success, error) {

    var query = 'SELECT alloOrder.*, allo.name FROM alloOrder INNER JOIN allo ON alloOrder.alloId = allo.id ORDER BY created_at';

    db.connection.query(query, function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findAllNotFinish = function (success, error) {

    var query = 'SELECT alloOrder.*, allo.name FROM alloOrder INNER JOIN allo ON alloOrder.alloId = allo.id WHERE finish = 0 ORDER BY created_at';

    db.connection.query(query, function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findNotFinishForAlloId = function (alloId, success, error) {

    var query = 'SELECT * FROM alloOrder WHERE finish = 0 AND alloId = ? ORDER BY created_at';

    db.connection.query(query, [alloId], function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.removeOrder = function (id, success, error) {

    var query = 'UPDATE alloOrder SET finish = 1 WHERE id = ?';

    db.connection.query(query, [id], function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.addOrder = function (order, success, error) {

    var query = 'INSERT INTO alloOrder (studentName, addresse, alloId, quantity, specification, created_at) VALUES(?,?,?,?,?,?)';

    db.connection.query(query, [order.name, order.address, order.alloId, order.quantity, order.specification, new Date()], function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.updateInProgress = function (id, state, success, error) {

    var query = 'UPDATE alloOrder SET inProgress = ? WHERE id = ?';

    db.connection.query(query, [state, id], function (err, rows) {

        if (!err) {
            success(rows);
        } else {
            console.error(err);
            error(err);
        }
    });
};

/*module.exports.findById = (id, success, error) => {

    let query = 'SELECT * FROM product WHERE id = ? ORDER BY price';

    db.connection.query(query, [id], (err, rows) => {

        if (!err) {
            success(rows[0]);

        } else {
            console.error(err);
            error(err);
        }
    });
};*/
//# sourceMappingURL=order.srv.js.map
let db = require('../db.js');

module.exports.findAll = (success, error) => {

    let query = 'SELECT alloOrder.*, allo.name FROM alloOrder INNER JOIN allo ON alloOrder.alloId = allo.id ORDER BY created_at';

    db.connection.query(query, (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findAllNotFinish = (success, error) => {

    let query = 'SELECT alloOrder.*, allo.name FROM alloOrder INNER JOIN allo ON alloOrder.alloId = allo.id WHERE finish = 0 ORDER BY created_at';

    db.connection.query(query, (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findNotFinishForAlloId = (alloId, success, error) => {

    let query = 'SELECT * FROM alloOrder WHERE finish = 0 AND alloId = ? ORDER BY created_at';

    db.connection.query(query, [alloId], (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.removeOrder = (id, success, error) => {

    let query = 'UPDATE alloOrder SET finish = 1 WHERE id = ?';

    db.connection.query(query, [id], (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.addOrder = (order, success, error) => {

    let query = 'INSERT INTO alloOrder (studentName, addresse, alloId, quantity, specification, created_at) VALUES(?,?,?,?,?,?)';

    db.connection.query(query, [order.name, order.address, order.alloId, order.quantity, order.specification, new Date()], (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.updateInProgress = (id,state, success, error) => {

    let query = 'UPDATE alloOrder SET inProgress = ? WHERE id = ?';

    db.connection.query(query, [state,id], (err, rows) => {

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


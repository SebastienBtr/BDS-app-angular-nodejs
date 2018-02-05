let db = require('../db.js');

module.exports.findWithAlloId = (alloId, success, error) => {

    let query = 'SELECT * FROM specification WHERE alloId = ?';

    db.connection.query(query, [alloId], (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};

module.exports.findWithId = (id, success, error) => {

    let query = 'SELECT * FROM specification WHERE id = ?';

    db.connection.query(query, [id], (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            console.error(err);
            error(err);
        }
    });
};
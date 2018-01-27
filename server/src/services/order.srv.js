let db = require('../db.js');

module.exports.findAll = (success, error) => {

    let query = 'SELECT * FROM alloOrder ORDER BY created_at';

    db.connection.query(query, (err, rows) => {

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


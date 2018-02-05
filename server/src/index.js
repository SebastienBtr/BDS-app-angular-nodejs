let app = require('express')();
let conf = require('./config.js');
let dbParams = conf.get('db');
let db = require('./db.js');
let mysql = require('mysql');
let bodyParser = require('body-parser');

let ordersController = require('./controllers/order.ctrl.js');
let allosController = require('./controllers/allo.ctrl');
let specificationController = require('./controllers/specification.ctrl.js');


// Add headers
app.use( (req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json());

// all of our routes will be prefixed with /api
app.use('/api', [ordersController, allosController, specificationController]);

function dbConnection() {

    let objConn = mysql.createConnection({
        host: dbParams.host,
        user: dbParams.user,
        password: dbParams.password,
        database: dbParams.database
    });

    objConn.connect( (err) => {

        if (err) {
            console.error('error when connecting to db:', err.code);
            setTimeout(dbConnection, dbParams.timeoutBeforeReconnection); // We introduce a delay before attempting to reconnect

        } else {
            console.info('Connected to db !');
            db.connection = objConn;
        }
    });

    objConn.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually lost
            dbConnection();
        } else {
            throw err;
        }
    });
}

dbConnection();

let port = conf.get('server').port;

app.listen(port, () => {
    console.log('app listening on port ' + port);
});
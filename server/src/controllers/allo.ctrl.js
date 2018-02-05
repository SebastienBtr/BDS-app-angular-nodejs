let express = require('express');
let router = express.Router();

let alloService = require('../services/allo.srv.js');

router.get('/all-allo', (req, res) => {

    console.log("call to get all allo");

    alloService.findAll( (orders) => {
        res.send(orders);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching allos' });
    });

});

router.get('/allo-active', (req, res) => {

    console.log("call to get allo active");

    alloService.findActive( (orders) => {
        res.send(orders);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching allos active' });
    });

});

router.get('/allo-active/:id', (req, res) => {

    console.log("call to get allo active for id");

    let id = req.params.id;

    alloService.findActiveWithId( id, (orders) => {
        res.send(orders);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching allo active for id' });
    });

});

router.get('/allo/:id', (req, res) => {

    console.log("call to get allo for id");

    let id = req.params.id;

    alloService.findWithId( id, (orders) => {
        res.send(orders);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching allo for id' });
    });

});

router.post('/update-active-allo/:id', (req, res) => {

    console.log("call to update active allo");

    let id = req.params.id;
    console.log(req.body.state);
    let state = req.body.state ? 1 : 0;

    alloService.updateActive(id,state, () => {
        res.end();

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when updating allo active' });
    });

});

module.exports = router;
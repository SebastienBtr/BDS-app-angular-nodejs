let express = require('express');
let router = express.Router();

let specificationService = require('../services/specification.srv');

router.get('/specifications/:alloId', (req, res) => {

    console.log("call to get specifications for allo id");

    let alloId = req.params.alloId;

    specificationService.findWithAlloId( alloId, (specs) => {
        res.send(specs);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching specifications for allo id' });
    });

});

router.get('/specification/:id', (req, res) => {

    console.log("call to get specification with id");

    let id = req.params.id;

    specificationService.findWithId( id, (spec) => {
        res.send(spec);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching specification with id' });
    });

});


module.exports = router;
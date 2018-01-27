let express = require('express');
let router = express.Router();

let orderService = require('../services/order.srv.js');

router.get('/orders', (req, res) => {

    orderService.findAll( (orders) => {
        res.send(orders);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching orders' });
    });

});

/*router.get('/product/:id', (req, res) => {

    let id = req.params.id;

    productService.findById(id, (product) => {
        res.send(product);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching the product' });
    });

});*/


module.exports = router;
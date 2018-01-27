'use strict';

var express = require('express');
var router = express.Router();

var productService = require('../services/order.srv.js');

router.get('/orders', function (req, res) {

    orderService.findAll(function (orders) {
        res.send(orders);
    }, function (error) {
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
//# sourceMappingURL=alloOrder.ctrl.js.map
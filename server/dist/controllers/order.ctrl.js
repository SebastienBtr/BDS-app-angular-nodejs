'use strict';

var express = require('express');
var router = express.Router();

var orderService = require('../services/order.srv.js');

router.get('/all-orders', function (req, res) {

    console.log("call to get all orders");

    orderService.findAll(function (orders) {
        res.send(orders);
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching orders' });
    });
});

router.get('/orders-not-finish', function (req, res) {

    console.log("call to get all orders not finish");

    orderService.findAllNotFinish(function (orders) {
        res.send(orders);
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching orders not finish' });
    });
});

router.get('/orders-not-finish/:alloId', function (req, res) {

    console.log("call to get orders for an allo");

    var alloId = req.params.alloId;

    orderService.findNotFinishForAlloId(alloId, function (orders) {
        res.send(orders);
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching orders not finish for alloId' });
    });
});

router.post('/remove/:id', function (req, res) {

    console.log("call to remove order");

    var id = req.params.id;

    orderService.removeOrder(id, function () {
        res.end();
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when remove an order' });
    });
});

var correctOrderParam = function correctOrderParam(order) {

    if (isNaN(order.quantity)) {
        return false;
    } else if (order.quantity.length > 2) {
        return false;
    } else if (order.name == "") {
        return false;
    } else if (order.name.length > 30) {
        return false;
    } else if (order.address == "") {
        return false;
    } else if (order.address.length > 60) {
        return false;
    }

    return true;
};

router.post('/add-order', function (req, res) {

    console.log("call to add order");

    var order = req.body.order;

    if (!correctOrderParam(order)) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error : order fields are not correct' });
    }

    orderService.addOrder(order, function () {
        res.end();
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when add an order' });
    });
});

router.post('/update-in-progress/:id', function (req, res) {

    console.log("call to update in progress");

    var id = req.params.id;
    var state = req.body.state ? 1 : 0;

    orderService.updateInProgress(id, state, function () {
        res.end();
    }, function (error) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when update in progress' });
    });
});

module.exports = router;
//# sourceMappingURL=order.ctrl.js.map
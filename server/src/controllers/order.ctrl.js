let express = require('express');
let router = express.Router();

let orderService = require('../services/order.srv.js');

router.get('/all-orders', (req, res) => {

    console.log("call to get all orders");

    orderService.findAll( (orders) => {
        res.send(orders);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching orders' });
    });

});

router.get('/orders-not-finish', (req, res) => {

    console.log("call to get all orders not finish");

    orderService.findAllNotFinish( (orders) => {
        res.send(orders);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching orders not finish' });
    });

});

router.get('/orders-not-finish/:alloId', (req, res) => {

    console.log("call to get orders for an allo");

    let alloId = req.params.alloId;

    orderService.findNotFinishForAlloId(alloId, (orders) => {
        res.send(orders);

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when searching orders not finish for alloId' });
    });

});

router.post('/remove/:id', (req, res) => {

    console.log("call to remove order");

    let id = req.params.id;

    orderService.removeOrder(id, () => {
        res.end();

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when remove an order' });
    });

});

let correctOrderParam =  (order) => {

     if (isNaN(order.quantity)) {
        return false;

    } else if (order.quantity.length > 2) {
        return false;

    } else if (order.name == "") {
        return false;

    } else  if (order.name.length > 30) {
        return false;

    } else if (order.address == "") {
        return false;

    } else if (order.address.length > 60) {
        return false;
    }

    return true;
};

router.post('/add-order', (req, res) => {

    console.log("call to add order");

    let order = req.body.order;

    if (!correctOrderParam(order)) {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error : order fields are not correct' });
    }

    orderService.addOrder( order, () => {
        res.end();

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when add an order' });
    });

});

router.post('/update-in-progress/:id', (req, res) => {

    console.log("call to update in progress");

    let id = req.params.id;
    let state = req.body.state ? 1 : 0;

    orderService.updateInProgress(id,state, () => {
        res.end();

    }, (error) => {
        console.error(error);
        res.statusCode = 401;
        res.send({ errorCode: 'Error SQL when update in progress' });
    });

});

module.exports = router;
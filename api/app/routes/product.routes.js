module.exports = (app) => {
    const auth = require('../controllers/auth.controller');
    const order = require('../controllers/order.controller');
    app.post('/login', auth.login);
    app.get('/order-list/:id', order.getOrderList);
    app.post('/new-order', order.addOrder);
    app.get('/get-order/:id', order.getOrder);
    app.post('/update-order', order.updateOrder);
    app.delete('/delete-order/:id', order.deleteOrder);
};
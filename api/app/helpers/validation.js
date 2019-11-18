const Response = require("../helpers/response");

module.exports = {
    loginValidation: function(Request, res, callback){
        if (!Request.body.username)  return res.status(400).send(Response.error(0, 'Username required.'));
        if (!Request.body.password)  return res.status(400).send(Response.error(0, 'Password required.'));
        return callback(true);

    },

    addOrderValidation: function(Request, res, callback){
        console.log(Request.body);
        if (!Request.body.order_number)  return res.status(400).send(Response.error(0, 'Order number required.'));
        if (!Request.body.order_due_date)  return res.status(400).send(Response.error(0, 'Order due date required.'));
        if (!Request.body.customer_buyer_name)  return res.status(400).send(Response.error(0, 'Customer buyer required.'));
        if (!Request.body.customer_address)  return res.status(400).send(Response.error(0, 'Customer address required.'));
        if (!Request.body.customer_phone)  return res.status(400).send(Response.error(0, 'Customer phone required.'));
        if (!Request.body.order_amount)  return res.status(400).send(Response.error(0, 'Order amount required.'));
        if (!Request.body.user_id)  return res.status(400).send(Response.error(0, 'User id required.'));
        return callback(true);

    }
}
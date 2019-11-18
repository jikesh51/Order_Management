const Order = require('../models/order.model.js');
const Response = require("../helpers/response");
const validation = require('../helpers/validation');
let ObjectId = require('mongodb').ObjectID;

exports.getOrderList = (req, res) => {
    Order.find({user_id: req.params.id}, async(err, data) => {
        if (err) return res.status(400).send(Response.error(0, 'Something went wrong!'));
        if (!data) return res.status(400).send(Response.error(0, 'No data found!'));
         let orderTotal = 0;
         for(let i=0; i < data.length; i++){
            orderTotal += parseInt(data[i].order_amount);
         } 
        return res.status(200).send(Response.success(data, 1, 'Order list fetched successfully.',orderTotal))
    });
}

exports.addOrder = (req, res) => {
    validation.addOrderValidation(req, res, (validation)=> {
        const order = new Order({
            user_id: req.body.user_id,
            order_number: req.body.order_number,
            order_due_date: req.body.order_due_date,
            customer_buyer_name: req.body.customer_buyer_name,
            customer_address: req.body.customer_address,
            customer_phone: req.body.customer_phone,
            order_amount: req.body.order_amount
        })
        if(validation === true){
            order.save().then(data => {
                return res.status(200).send(Response.success(data, 1, 'Order added successfully'))
            }).catch(err=>{
                return res.status(400).send(Response.error(0, 'Something went wrong, please try again later!'));
            })
        }

    });
}

exports.getOrder = (req, res) => {
    Order.find({_id: ObjectId(req.params.id)}, (err, data) => {
        if (err) return res.status(400).send(Response.error(0, 'Something went wrong!'));
        if (!data) return res.status(400).send(Response.error(0, 'No data found!'));
        return res.status(200).send(Response.success(data, 1, 'Order details fetched successfully.'))
    });
}

exports.updateOrder = (req, res) => {
    validation.addOrderValidation(req, res, (validation)=> {
         let orderUpdateDetails = {
            order_number: req.body.order_number,
            order_due_date: req.body.order_due_date,
            customer_buyer_name: req.body.customer_buyer_name,
            customer_address: req.body.customer_address,
            customer_phone: req.body.customer_phone,
            order_amount: req.body.order_amount
        };
        if(validation === true){
            Order.updateOne({_id: req.body.user_id}, orderUpdateDetails).then(data => {
                return res.status(200).send(Response.success(data, 1, 'Order updated successfully.'))
            }).catch(err=>{
                return res.status(400).send(Response.error(0, 'Something went wrong, please try again later!'));
            })
        }

    });
}

exports.deleteOrder = (req, res) => {
    Order.findByIdAndRemove(req.params.id).then( data => {
        if (!data) return res.status(400).send(Response.error(0, 'No data found!'));
        return res.status(200).send(Response.success(data, 1, 'Order deleted fetched successfully.'))
    }).catch(err =>{
        return res.status(400).send(Response.error(0, 'Something went wrong!'));
    });
}
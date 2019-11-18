const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    user_id: String,
    order_number: String,
    order_due_date: Date,
    customer_buyer_name: String,
    customer_address: String,
    customer_phone: String,
    order_amount: String
}, {
    timestamps: true
});

module.exports = mongoose.model('order', orderSchema);
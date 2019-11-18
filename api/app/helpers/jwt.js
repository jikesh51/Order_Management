const jwt = require('jsonwebtoken');
module.exports = {
    makeJwt(data) {
        console.log(data);
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
            _id: data._id,
            username: this.email,
            exp: parseInt(expiry.getTime() / 1000),
          }, "Order_Management");
    },

    verifyJwt(){
        jwt.verify(token, 'Order_Management', function(err, decode){
            console.log(decode);
            return decode;
        });
    }
}
const Auth = require('../models/auth.model.js');
const Response = require("../helpers/response");
const validation = require('../helpers/validation');
const Jwt = require('../helpers/jwt');

exports.login = (req, res) => {
    validation.loginValidation(req, res, (validation)=> {
        if(validation === true){
            Auth.findOne({username:req.body.username, password: req.body.password}, (err, data) => {
                if (err) return res.status(400).send(Response.error(0, 'Something went wrong!'));
                if (!data) return res.status(400).send(Response.error(0, 'No data found!'));
                delete data.password;
                let token = Jwt.makeJwt(data);
                return res.status(200).send(Response.success(data, 1, 'Logged-in successfully', token))
            });
        }

    })
};
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then((data) => {
    console.log("Successfully connected to the database");
}).catch(err => {
    process.exit();
});
require('./app/routes/product.routes')(app);
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

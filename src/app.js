const express = require('express');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares');
const requestTime = require('./middlewares/requestTime');

const employeesRouters = require('./routes/employees');
const productController = require('./controllers/productControlller');
const ordercontroller = require('./controllers/orderController');
const supplierController = require('./controllers/supplierController');
const deliveryController = require('./controllers/deliveryController');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(requestTime);

app.use('/api/employees', employeesRouters);
app.use(productController);
app.use(ordercontroller);
app.use(supplierController);
app.use(deliveryController);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

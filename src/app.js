const express = require('express');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const requestTime = require('./middlewares/requestTime');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const supplierRoute = require('./routes/supplierRoute');
const deliveryRoute = require('./routes/deliveryRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(requestTime);

app.use('/api/product', productRoute);
app.use('order', orderRoute);
app.use('api/supplier', supplierRoute);
app.use('delivery', deliveryRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

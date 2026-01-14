const express = require("express");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares");
const requestTime = require("./middlewares/requestTime");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(requestTime);

const employeesRouters = require("./routes/employees");
app.use("/api/employees", employeesRouters);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

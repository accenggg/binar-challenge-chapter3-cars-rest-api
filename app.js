// THIRD PARTY MODULE
const express = require("express");
const morgan = require("morgan");

// LOCAL MODULE
const carsRouter = require("./routes/cars");
const testingRouter = require("./routes/testing");

const app = express();

// MIDDELWARE
app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// ROUTING

app.use("/api/v1/", testingRouter);
app.use("/api/v1/cars", carsRouter);

module.exports = app;

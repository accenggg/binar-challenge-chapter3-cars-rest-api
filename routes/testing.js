// THIRD PARTY MODULE
const express = require("express");
const router = express.Router();

const testingController = require("../controllers/testing");

router
    .route("/")
    .get(testingController.pingMessage);

module.exports = router;

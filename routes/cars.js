// THIRD PARTY MODULE
const express = require("express");

const carController = require("../controllers/cars");

const router = express.Router();

router.param("id", carController.checkId);

router
    .route("/")
    .get(carController.getAllCars)
    .post(
        carController.checkBody,
        carController.createCar
    );

router
    .route("/:id")
    .get(carController.getCarById)
    .put(
        carController.checkBody,
        carController.updateCar
    )
    .delete(carController.deleteCar);

module.exports = router;

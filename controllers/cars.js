// CORE MODULE
const fs = require("fs");

// DATA
const cars = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/cars.json`
    )
);

// FUNCTION
const getAllCars = (req, res) => {
    res.status(200).json({
        status: "success",
        requestTime: req.requestTime,
        data: {
            cars,
        },
    });
};

const getCarById = (req, res) => {
    const id = req.params.id;
    const car = cars.find((el) => el.id === id);
    if (!car) {
        return res.status(404).json({
            status: "failed",
            message: `data with ${id} this not found`,
        });
    }

    res.status(200).json({
        status: "success",
        requestTime: req.requestTime,
        data: {
            car,
        },
    });
};

const createCar = (req, res) => {
    const newId = cars[cars.length - 1].id + 1;
    const newCar = Object.assign(
        {
            id: newId,
        },
        req.body
    );

    cars.push(newCar);
    fs.writeFile(
        `${__dirname}/dev-data/data/cars.json`,
        JSON.stringify(cars),
        (err) => [
            res.status(201).json({
                status: "success",
                requestTime: req.requestTime,
                data: {
                    user: newCar,
                },
            }),
        ]
    );
};

const updateCar = (req, res) => {
    const id = req.params.id;
    const carIndex = cars.findIndex(
        (el) => el.id === id
    );

    if (carIndex === -1) {
        return res.status(404).json({
            status: "failed",
            message: `data with ${id} this not found`,
        });
    }

    cars[carIndex] = {
        ...cars[carIndex],
        ...req.body,
    };

    fs.writeFile(
        `${__dirname}/dev-data/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: "success",
                message: `tour with this id ${id} edited`,
                data: {
                    car: cars[carIndex],
                },
            });
        }
    );
};

const deleteCar = (req, res) => {
    const id = req.params.id;
    const carIndex = cars.findIndex(
        (el) => el.id === id
    );

    if (carIndex === -1) {
        return res.status(404).json({
            status: "failed",
            message: `data id ${id} not found`,
        });
    }

    cars.splice(carIndex, 1);

    fs.writeFile(
        `${__dirname}/dev-data/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: "success",
                message: "data deleted",
                data: null,
            });
        }
    );
};

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};

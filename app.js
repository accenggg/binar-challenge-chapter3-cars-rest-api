// MODULE
const fs = require("fs");
const express = require("express");
const app = express();

// PORT
const port = process.env.port || 3000;

// MIDDELWARE
app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// DATA
const cars = JSON.parse(
    fs.readFileSync(
        `${__dirname}/dev-data/data/cars.json`
    )
);

// FUNCTION
const pingMessage = (req, res) => {
    res.status(200).json({
        message: "ping successfully",
    });
};

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

// ROUTING
const testingRouter = express.Router();
const carsRouter = express.Router();

testingRouter
    .route('/')
    .get(pingMessage);

carsRouter
    .route("/")
    .get(getAllCars)
    .post(createCar);

carsRouter
    .route("/:id")
    .get(getCarById)
    .put(updateCar)
    .delete(deleteCar);

app.use("/api/v1/", testingRouter);
app.use("/api/v1/cars", carsRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

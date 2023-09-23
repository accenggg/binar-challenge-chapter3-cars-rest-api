// CORE MODULE
const fs = require("fs");

// FUNCTION
const pingMessage = (req, res) => {
    res.status(200).json({
        message: "ping successfully",
    });
};

module.exports = {
    pingMessage,
};

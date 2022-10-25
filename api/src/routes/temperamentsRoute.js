const express = require("express");
const temperamentsRoute = express.Router();
const getTemperaments = require("../controllers/getTemperaments");

temperamentsRoute.get("/", async (req, res) => {
    try {
        const tempTotal = await getTemperaments();
        res.status(200).send(tempTotal);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = temperamentsRoute;
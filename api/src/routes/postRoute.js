const express = require("express");
const postRoute = express.Router();
const { Dog, Temperament } = require("../db");

postRoute.post("/", async (req, res) => {
    let { name, height, weight, life_span, image, temperament } = req.body;
    try {
        const newDog = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image,
        });

        if(!name || !height || !weight) return res.status(400).send("Name, height and weight are required");

        const temperamentDb = await Temperament.findAll({
            where: {name: temperament},
        });
        await newDog.addTemperament(temperamentDb);
        res.status(200).send(newDog);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = postRoute;
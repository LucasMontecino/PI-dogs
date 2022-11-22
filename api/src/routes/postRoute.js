const express = require("express");
const postRoute = express.Router();
const { Dog, Temperament } = require("../db");

postRoute.post("/", async (req, res) => {
    let { name, min_height, max_height, min_weight, max_weight, life_span, image, temperament } = req.body;
        const fixedHeight = [];
        const minHeight = min_height;
        const maxHeight = max_height;
        fixedHeight.push(minHeight, maxHeight);

        const fixedWeight = [];
        const minWeight = min_weight;
        const maxWeight = max_weight;
        fixedWeight.push(minWeight, maxWeight);

    try {
        let newDog = await Dog.create({
            name,
            height: fixedHeight,
            weight: fixedWeight,
            life_span,
            image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
        });

        let temperamentDb = await Temperament.findAll({
            where: {name: temperament },
        });
        newDog.addTemperament(temperamentDb);
        res.status(200).send(newDog);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = postRoute;
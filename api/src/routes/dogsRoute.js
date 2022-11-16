const express = require("express");
const dogsRoute = express.Router();
const getDogs = require("../controllers/getDogs");


dogsRoute.get("/", async(req, res) => {
    let { name } = req.query;
    try {
        const allDogs = await getDogs();
        if(name && allDogs.length){
            const dogName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send("No dog with that name");
        };
        if(allDogs.length && !name){
            res.status(200).send(allDogs);
        };
    } catch (error) {
        res.status(400).send(error.message);
    }
});

dogsRoute.get("/:id", async (req, res) => {
    let { id } = req.params;
    try {
        const allDogs = await getDogs();
        if(id && allDogs.length){
            const dogId = allDogs.find(dog => dog.id == id);
            dogId ? 
            res.status(200).send(dogId) :
            res.status(404).send("No dog with that id");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = dogsRoute;

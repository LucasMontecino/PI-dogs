const { Temperament } = require("../db");
const axios = require("axios");

const getTemperaments = async () => {
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo = apiUrl.data.map((temp) => temp.temperament);
    const temps = apiInfo.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
            where: {name: i},
        });
    });
    const allTemp = await Temperament.findAll();
    return allTemp;
};

module.exports = getTemperaments;
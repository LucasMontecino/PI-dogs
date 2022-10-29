const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getDogs = async () => {
        const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
        const apiInfo = apiUrl.data.map((dog) => {
            let tempArray = [];
            if(dog.temperament){
                tempArray = dog.temperament.split('  ');
            }
                return {
                    id: dog.id ? dog.id : "id doesnt exist",
                    name: dog.name ? dog.name : "name doesnt exist",
                    height: dog.height.metric ? dog.height.metric : "height doesnt exist",
                    weight: dog.weight.metric ? dog.weight.metric : "weight doesnt exist",
                    temperaments: tempArray ? tempArray : "temp doesnt exist",
                    life_span: dog.life_span ? dog.life_span : "life_span doesnt exist",
                    image: dog.image.url ? dog.image.url : "image not found",
                };
            });

        const dbInfo = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                thorugh: {attributes: []},
            },
        });
        const totalInfo = [...apiInfo, ...dbInfo];
        return totalInfo;
};

module.exports = getDogs;
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getDogsApi = async () => {
        const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
        const apiInfo = apiUrl.data.map((dog) => {
            let tempArray = [];
            if(dog.temperament){
                tempArray = dog.temperament.split(', ');
            }

            let heightArray = [];
            if(dog.height.metric){
                heightArray = dog.height.metric.split(" - ");
            };

            let weightArray = [];
            if(dog.weight.metric){
                weightArray = dog.weight.metric.split(" - ");
            };

                return {
                    id: dog.id ? dog.id : "id doesnt exist",
                    name: dog.name ? dog.name : "name doesnt exist",
                    height: heightArray ? heightArray : "height doesnt exist",
                    weight: weightArray ? weightArray : "weight doesnt exist",
                    temperaments: tempArray ? tempArray : "temp doesnt exist",
                    life_span: dog.life_span ? dog.life_span : "life_span doesnt exist",
                    image: dog.image.url ? dog.image.url : "image not found",
                };
            });
            return apiInfo;
        }

const getDogsDb = async () => {
        return await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
};

const getDogs = async () => {
    const apiDogs = await getDogsApi();
    const dbDogs = await getDogsDb();
    const infoTotal = [...apiDogs, ...dbDogs];
    return infoTotal;
};

module.exports = getDogs;
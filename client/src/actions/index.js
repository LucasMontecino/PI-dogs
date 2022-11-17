import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("/dogs");
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        });
    };
};

export function getDogsName(name){
    return async function(dispatch){
        try {
            var json = await axios.get("/dogs?name=" + name);
            return dispatch({
                type: "GET_DOGS_NAME",
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function getTemperaments() {
    return async function(dispatch){
        var json = await axios.get("/temperaments");
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data
        });
    };
};

export function postDog(payload){
    return async function(dispatch){
        const response = await axios.post("/dog", payload);
        return response;
    }
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    };
};

export function orderByWeight(payload){
    return {
        type: "ORDER_BY_WEIGHT",
        payload
    };
};

export function getDogDetail(id){
    return async function(dispatch){
        try{
            if (id) {
                var json = await axios.get("/dogs/" + id);
                return dispatch({
                    type: "GET_DOG_DETAIL",
                    payload: json.data
                });
            } else {
                return dispatch({
                    type: "GET_DOG_DETAIL",
                    payload: ""
                })
            }

        } catch(error){
            console.log(error);
        };
    };
};

export function filterDogsByTemperaments(payload){
    return {
        type: "GET_FILTER_BY_TEMPERAMENTS",
        payload
    };
};

export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    };
};
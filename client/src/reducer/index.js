

const initialState = {
    dogs: [],
    detail: [],
    allDogs: [],
    temperaments: [],
};

function rootReducer(state=initialState, action) {
    switch(action.type) {
        case "GET_DOGS":
            action.payload.forEach(el => {
                if(!el.temperaments[0]){
                    el.temperaments[0] = "no-temperaments"
                };
            });
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };

        case "GET_DOGS_NAME":
            return {
                ...state,
                dogs: action.payload
            };
        
        case "GET_TEMPERAMENTS":
            const filterTemp = action.payload.filter((temp) => temp.name !== "");
            return {
                ...state,
                temperaments: filterTemp,
            };
        
        case "GET_FILTER_BY_TEMPERAMENTS":
            const allDogs = state.allDogs;
            let filterDogs = [];
            if(action.payload === "All"){
                filterDogs = allDogs;
            } else {
                for(let i = 0; i < allDogs.length; i++) {
                    let foundDog = allDogs[i].temperaments.find((t) => t === action.payload);
                    if(foundDog){
                        filterDogs.push(allDogs[i]);
                    };
                };
            };
            return {
                ...state,
                dogs: filterDogs
            };
        
        case "ORDER_BY_NAME":
            let sortedArr = action.payload === "asc" ? 
            state.dogs.sort(function (a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort(function (a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                dogs: sortedArr
            };

        case "ORDER_BY_WEIGHT":
            const sortedWeight = action.payload === "min_weight" ? state.allDogs.sort((a, b) => {
                if(parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                    return 1;
                };
                if(parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                    return -1;
                };
                return 0;
            }) 
            : state.allDogs.sort((a, b) => {
                if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                    return -1;
                };
                if(parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                    return 1;
                };
                return 0;
            });
            return {
                ...state,
                dogs: sortedWeight,
            };
            
        case "POST_DOG":
            return {
                ...state
            };
            
        case "FILTER_CREATED":
            const allDogs2 = state.allDogs;
            const createdFilter = action.payload === "created" ? allDogs2.filter(el => el.createdInDb) : allDogs2.filter(el => !el.createdInDb);
            return {
                ...state,
                dogs: createdFilter
            };
        
        case "GET_DOG_DETAIL":
            return {
                ...state,
                detail: action.payload
            };

        default:
            return state;
    };

};

export default rootReducer;
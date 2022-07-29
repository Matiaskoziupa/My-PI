import {GET_VIDEOGAMES, FILTER_CREATED, FILTER_BY_RATING, ORDER_BY_NAME, GET_GENRES, FILTER_BY_GENRE, GET_NAME_VIDEOGAMES} from "../actions/index.js";


const initialState = {
    videogames: [],
    allVideogames: [],
    genres: []
}
// console.log(videogames)
function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_VIDEOGAMES:
            return{
                ...state,
                videogames:action.payload,
                allVideogames:action.payload
            }
            case FILTER_CREATED:
                const allVideogames2=state.allVideogames
                const createdFilter= action.payload === "created" ? allVideogames2.filter(s=>s.createdInDb) : allVideogames2.filter(s=>!s.createdInDb)
                return {
                    ...state,
                    videogames:action.payload === "All" ? state.allVideogames : createdFilter
                }
                case ORDER_BY_NAME:
                    let sortArr = action.payload === "asc"? 
                    state.videogames.sort(function(a,b){
                        if( a.name > b.name){
                            return 1;
                        }   
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }): 
                    state.videogames.sort(function(a,b){
                        if(a.name>b.name){
                            return -1;
                        }
                        if(b.name>a.name){
                            return 1;
                        }
                        return 0;
                    })
                    return{
                        ...state,
                        videogames:sortArr
                    }
                    case FILTER_BY_RATING:
                        let sortedArr2 = action.payload === 'asc'?
                        state.videogames.sort(function(a,b){
                            if (a.rating> b.rating){
                                return 1;
                            }
                            if (b.rating>a.rating){
                                return -1;
                            }
                            return 0;
                        }) : // sino.....
                        state.videogames.sort(function(a,b){
                            if(a.rating>b.rating){
                                return -1;
                            }
                            if (b.rating>a.rating){
                                return 1;
                            }
                            return 0;
                        })
                        return {
                            ...state,
                            videogames:sortedArr2
                        }
                    case GET_NAME_VIDEOGAMES:
                        return{
                            ...state,
                            videogames:action.payload
                        }
                        case "POST_VIDEOGAMES":
                            return{
                                ...state,
                            }
                            case GET_GENRES:
                                return{
                                    ...state,
                                    genres:action.payload,
                                } 
                                case FILTER_BY_GENRE:
                                    const videogamesToFilterByGenre = state.allVideogames;
                                    const genreFilter = action.payload === 'All' ?
                                    videogamesToFilterByGenre :
                                    videogamesToFilterByGenre.filter(s => s.genres.includes(action.payload))
                                    return {
                                        ...state,
                                        videogames : genreFilter
                        
                                    };
                                    default:
                                        return{
                                            state
                                        };
                                    }
                                }
export default rootReducer;
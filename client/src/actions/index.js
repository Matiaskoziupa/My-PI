import axios from "axios";
export const GET_VIDEOGAMES="GET_VIDEOGAMES";
export const FILTER_BY_RATING="FILTER_BY_RATING";
export const FILTER_CREATED="FILTER_CREATED";
export const ORDER_BY_NAME="ORDER_BY_NAME";
export const GET_GENRES="GET_GENRES";
export const FILTER_BY_GENRE="FILTER_BY_GENRE";
export const GET_NAME_VIDEOGAMES="GET_NAME_VIDEOGAMES";

export function getVideogames(){
    return async function(dispatch){
        let json =await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type:"GET_VIDEOGAMES",
            payload:json.data
        });
    }
}
export function getGenres(){
    return async function(dispatch){
        let json= await axios.get("http://localhost:3001/genres");
        return dispatch({
            type:"GET_GENRES",
            payload:json.data
        });
    }
}
export function postVideogames(payload){
    return async function(dispatch){
        const json= await axios.post("http://localhost:3001/videogames",payload);
        return json;
    }
}
export function filterByGenre(payload) {
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}
export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}
export function filterByRating(payload){
    return{
        type: "FILTER_BY_RATING",
        payload:payload
    }
}
export function orderByName(payload){
    return{
        type:"ORDER_BY_NAME",
        payload:payload
    }
}
export function getNameVideogames(name){
    return async function(dispatch){
        try{
            var json= await axios.get("http://localhost:3001/videogames?name=" + name);
            return dispatch({
                type:"GET_NAME_VIDEOGAMES",
                payload:json.data
            })
        } catch(error){
            console.log(error);
        }
    }
}





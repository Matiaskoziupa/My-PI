import React from "react";
import { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { postVideogames, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function Create(){
    const dispatch=useDispatch()
    const history=useHistory()
    const genres=useSelector((state)=>state.genres)
    // console.log(genres)

    const[input, setInput]=useState({
        name:"",
        released:"",
        rating:"",
        description:"",
        image:"",
        platforms:"",
        genre:[""],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }
    function handleSelect(e){
        setInput({
            ...input,
            genre:[...input.genre, e.target.value]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postVideogames(input))
        alert("Videogame created")
        setInput({
            name:"",
            released:"",
            rating:"",
            description:"",
            image:"",
            platforms:"",
            genre:[""],       
        })
        history.push("/home")
    }

    useEffect(()=>{
        dispatch(getGenres())
    }, []);

    return(
        <div>
            
            <Link to="/home"><button>Back</button></Link>
            <h1>Create your videogame</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type="text"
                    value= {input.name}
                    name= "name"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                    type="text"
                    value={input.description}
                    name="description"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Platforms:</label>
                    <input
                    type="text"
                    value={input.platforms}
                    name="platforms"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                    type="number"
                    value={input.rating}
                    name="rating"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Release date:</label>
                    <input
                    type="text"
                    value={input.released}
                    name="released"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <select onChange={(e)=>handleSelect(e)}>
                    {genres&&genres.map((s)=>(
                        <option value={s.name}>{s.name}</option>
                    ))}
                </select>
                <ul><li>{input.genre.map(s=>s + ",")}</li></ul>
                <button type="submit">Create videogame</button>
            </form>
        </div>
    )
}

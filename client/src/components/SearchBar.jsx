import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";


export default function SearchBar({setCurrentPage, setVideosPerPage}){
    const dispatch=useDispatch()
    const [name, setName]=useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }
    function handleSubmit(e){
        e.preventDefault()
        if(name.length!==0){
            dispatch(getNameVideogames(name))
        }else {
            alert('Enter a word before searching...')
        }
        setName("")
        // setCurrent(1)
    }
  

    return(
        <div>
            <input
            type="text"
            placeholder="Search..."
            onChange={(e)=>handleInputChange(e)}
            // onKeyDown={(e)=>onKeyDownHandler(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}
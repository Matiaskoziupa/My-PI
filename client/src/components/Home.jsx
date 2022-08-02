import React from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getVideogames, getGenres, filterByGenre, filterByRating, filterCreated, getNameVideogames, orderByName} from "../actions";
import Card from "./Card";
import SearchBar from "./SearchBar"
import Paginado from "./Paginado";

export default function Home(){
const dispatch = useDispatch();
let allGames = useSelector((state)=> state.videogames)//trae del reducer 
console.log(allGames)
 const [currentPage,setCurrentPage]= useState(1) //pag x local states
 const [videosPerPage,setVideosPerPage]= useState(15) //cuantos games x pagina

//  const videosPerPage=15

 const indexOflastvideo = currentPage * videosPerPage
 const indexOfFirstVideo =indexOflastvideo - videosPerPage
 const currentVideos = allGames?.slice(indexOfFirstVideo, indexOflastvideo) 

 const paginado= (pageNumber)=> {
     setCurrentPage(pageNumber)
 }


 useEffect(()=>{
    dispatch(getVideogames());
},[dispatch])

      
    function handleClick(e){
e.preventDefault();
dispatch(getVideogames());
    }
    
    function handleFilterByGenre (e) {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
        setVideosPerPage(15)
     
    }

    function handlefilterCreated (e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value)) 
        setCurrentPage(1) 
    }
    // const [orden, setOrden]= useState("")
    function handlefilterorderbyRating(e){
        e.preventDefault();
        dispatch(filterByRating(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    const [orden, setOrden]= useState("")
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    return(
        <div>
            
            <Link to="/videogames"><button>Create videogame</button></Link>
            <h1>Welcome to my page</h1>
            <h3><SearchBar/></h3>
            <button onClick={(e)=>handleClick(e)}>Reload all games</button>
            <select onChange={e=>handlefilterCreated(e)}>
                <option value="alpha">Sort created-all</option>
                <option value="All"> All</option>
                <option value="created"> created</option>
            </select>
            <select onChange={e=>handleSort(e)}>
                
                <option value="asc">Sort:  A - Z</option>
                <option value="desc">Sort:  Z - A</option>         
            </select>
            <select onChange={(e)=>handlefilterorderbyRating(e)}>
                <option value="asc">Low to high</option>
                <option value="desc">High to low</option>
            </select>
            <select onChange={e=>handleFilterByGenre(e)} >  
                <option value="All">All</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Arcade">Arcade</option>
                <option value="Board Games">Board Games</option>
                <option value="Card">Card</option>
                <option value="Casual">Casual</option>
                <option value="Educational">Educational</option>
                <option value="Family">Family</option>
                <option value="Fighting">Fighting</option>
                <option value="Indie">Indie</option>
                <option value="Massively Multiplayer">Massively Multiplayer</option>
                <option value="Platformer">Platformer</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Racing">Racing</option>
                <option value="RPG">RPG</option>
                <option value="Shooter">Shooter</option>
                <option value="Simulation">Simulation</option>
                <option value="Sports">Sports</option>
                <option value="Strategy">Strategy</option>
            </select >
            <Paginado
            videosPerPage={videosPerPage}
            allGames={allGames?.length}
            paginado={paginado}
            />
            {currentVideos&&currentVideos.map((s)=>{
                return(
                    <div>
                        <Link key={s.id} to={`/videogame/${s.id}`}>
                            <Card name={s.name} image={s.background_image} genres={s.genres}/>
                        </Link>
                    </div>
                );
            })}
        </div>
    )
}
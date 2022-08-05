import React from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getVideogames, getGenres, filterByGenre, filterByRating, filterCreated, getNameVideogames, orderByName} from "../actions";
import Card from "./Card";
import SearchBar from "./SearchBar"
import Paginado from "./Paginado";
import "./Home.css";

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
    function handlefilterCreated (e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value)) 
        setCurrentPage(1) 
    }
    
    function handleFilterByGenre (e) {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
        setVideosPerPage(15)
    }

   
    const [orden, setOrden]= useState("")
    function handlefilterorderbyRating(e){
        e.preventDefault();
        dispatch(filterByRating(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
        setCurrentPage(1)
        
    }
   
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    return(
        <div>
            <Link to="/videogames"><button className="btn2">Create videogame</button></Link>
            <h1 className="titles">Welcome to my page</h1>
           
            <div className="options1">
            <h3><SearchBar
            setCurrentPage={setCurrentPage}
            setVideosPerPage={setVideosPerPage}
            /></h3>
            <button className="btn2reload" onClick={(e)=>handleClick(e)}>Reload all games</button>
            <select className="select" onChange={e=>handlefilterCreated(e)}>
                <option value="All">Sort created-all</option>
                <option value="alpha"> All</option>
                <option value="created"> created</option>
            </select>
            <select className="select" onChange={(e)=>handlefilterorderbyRating(e)}>
                <option value="asc">Low to high</option>
                <option value="desc">High to low</option>
            </select>
            <select className="select" onChange={(e)=>handleSort(e)}>
                <option value="mas">Sort:  A - Z</option>
                <option value="menos">Sort:  Z - A</option>         
            </select>
            <select className="select" onChange={e=>handleFilterByGenre(e)} >  
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
            </div>
            <Paginado
            videosPerPage={videosPerPage}
            allGames={allGames?.length}
            paginado={paginado}
            />
            <div className="CONTAINER">
            {currentVideos&&currentVideos.map((s)=>{
                return(
                   
                        <Link key={s.id} to={`/videogame/${s.id}`}>
                            <Card name={s.name} image={s.background_image} genres={s.genres}/>
                        </Link>
                    
                );
            })}
            </div>
        </div>
    )
}
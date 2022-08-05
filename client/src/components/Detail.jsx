
import React from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./Detail.css";


export default function Detail(){
    const dispatch= useDispatch();
    const myVideo= useSelector((state)=>state.detail);

const {id} = useParams();
useEffect(()=>{
    dispatch(getDetail(id))
},[dispatch,id])




    return (
        <div>
            <Link  to= "/home">
                <button className="btnDe"> go back </button>
            </Link>
            
            { 
                Object(myVideo).length!==0? <div className="infocard">
                <div className=" info1">
                    <h1 className="h1">{myVideo&&myVideo.name}</h1>
                    <h5>Platforms: {myVideo&&myVideo.platforms?.join(" | ")} </h5>
                    <h2>Genres: {myVideo&&myVideo.genres?.join(" | ")} </h2>
                    <h4>Released: {myVideo&&myVideo.releaseDate}  {myVideo&&myVideo.released}</h4>
                    <h4>Rating: {myVideo&&myVideo.rating}</h4> 
                </div>
                <img className="imge" src={myVideo&&myVideo.background_image} alt="Not found" width="200px" height="200px" />
               <div className="info2">
             <p dangerouslySetInnerHTML={{__html: myVideo&&myVideo.description}}></p>
             </div>
            </div> : <div>Loading...</div>}
            </div>
         
    )}
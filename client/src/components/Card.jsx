
import React from "react";
import { useLinkClickHandler } from "react-router-dom";

import Detail from "./Detail";
import { Link } from "react-router-dom";
import "./Card.css"
export default function Card({name,image,genres}){

    return (
        <div className="card"> 
            <div className="card_items">
                <h2>{name}</h2>
                <img className="img" src= {image} alt="Not found" width="200px" height="250px" ></img>
                <h4>{ genres.join(" | ")}</h4>
            </div> 
        </div>      
    )
}
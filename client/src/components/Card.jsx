import React from "react";

export default function card({name, image, genres}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <img src={image} alt="Not found" width="250px" height="200px" />
        </div>
    );

}
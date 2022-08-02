// import React from "react";

// export default function card({name, image, genres, id}){
//     return(
//         <div>
//             <h3>{name}</h3>
//             <a href={`/videogame/${id}`}><img src={image} alt="Not found" width="250px" height="200px" /></a>
//             <h5>`{genres.join(" | ")}`</h5>
//             {/* <img src={image} alt="Not found" width="250px" height="200px" /> */}
//         </div>
//     );

// }
import React from "react";
import { useLinkClickHandler } from "react-router-dom";

import Detail from "./Detail";
import { Link } from "react-router-dom";

export default function Card({name,image,genres}){

    return (
        <div className="card"> 
            <div className="card_items">
                <h2>{name}</h2>
                <img src= {image} alt="Not found" width="250px" height="200px" ></img>
                
                <h4>{ genres.join(" | ")}</h4>
            </div> 
        </div>      
    )
}
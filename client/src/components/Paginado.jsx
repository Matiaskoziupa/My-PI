import React from "react";
import "./Paginado.css"
export default function Paginado({videosPerPage, allGames, paginado}){
const pageNumbers =[];
for(let i= 1; i<= Math.ceil(allGames/videosPerPage); i++){
    pageNumbers.push(i)
};
return (
    <nav className="page li">
        <ul>
            {pageNumbers.map((number)=>(
                <li  >
                    <a className="btn" onClick={()=>paginado(number)}>{number}</a>
                </li>
            ))}
        </ul> 
    </nav>
);
}
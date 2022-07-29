import React from "react";
export default function Paginado({videosPerPage, allGames, paginado}){
const pageNumbers =[];
for(let i= 1; i<= Math.ceil(allGames/videosPerPage); i++){
    pageNumbers.push(i)
};
return (
    <nav>
        <ul>
            {pageNumbers.map((number)=>(
                <li key={number}>
                    <a onClick={()=>paginado(number)}>{number}</a>
                </li>
            ))}
        </ul> 
    </nav>
);
}
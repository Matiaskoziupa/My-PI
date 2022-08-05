// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getDetail } from "../actions";
// import { useEffect } from "react";
// // import { useParams } from "react-router-dom";

// export default function Detail(props){
//     // console.log(props)
//     const dispatch=useDispatch();
//     // const history= useHistory();
//     useEffect(()=>{
//         dispatch(getDetail(props.match.params.id))
//     },[props.match.params.id, dispatch]);

//     const detailVideogame=useSelector((state)=>state.detail)
//     // console.log(detailVideogame)
//     return (
//             <div>
//                 <Link to="/home">
//                     <button>Back</button>
//                 </Link>
//                 {
//                     detailVideogame?.length >0 ?
//                     <div>
//                         <img src={detailVideogame&&detailVideogame[0].img? detailVideogame&&detailVideogame[0].img : detailVideogame&&detailVideogame[0].image} alt="Videogame"/>
//                         <div>
//                             <h1>{detailVideogame&&detailVideogame[0].name}</h1>
//                             <h4>Genres: {detailVideogame&&detailVideogame[0].genre}</h4>
//                             <h4>Description: {detailVideogame&&detailVideogame[0].description}</h4>
//                             <h4>Release date: {detailVideogame&&detailVideogame[0].released}</h4>
//                             <h4>Rating: {detailVideogame&&detailVideogame[0].rating}</h4>
//                             <h4>Platforms: {detailVideogame&&detailVideogame[0].platforms}</h4>
//                             {
//                                 detailVideogame&&detailVideogame[0].createdInDb 
//                             }
//                         </div>
//                     </div> : <p>Loading...</p>
//                 }
                
               
//             </div>
//         )
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
// const dispatch= useDispatch();
const {id} = useParams();
useEffect(()=>{
    dispatch(getDetail(id))
},[dispatch,id])

// useEffect(()=>{
//     return ()=>{
//         dispatch(getClean())
//     }
// }, []);


    return (
        <div>
            <Link  to= "/home">
                <button className="btnDe"> go back </button>
            </Link>
            <div className="infocard">
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
            </div>
            </div>
         
    )}
// import { useState, useEffect } from "react";
// import {useDispatch , useSelector} from "react-redux";
// import {Link} from 'react-router-dom';
// import { getGenres, postVideogames,getVideogames } from "../actions";
// // import  "./createVg.css"

// export default function Create(){
//     const dispatch= useDispatch()
//     const genres= useSelector((state)=>state.genres)


//     const[input,setInput]= useState({// obj to post
//         name:"",
//         rating:"",
//         released:"",
//         platforms:[],
//         genres:[],
//         released:"",
//         image:"",
//     })

// function handleChange(e){
//     setInput({
//         ...input,
//         [e.target.name]:e.target.value
//     })
// }

// function handleSelect(e){
    
//       setInput({
//         ...input,
//         genres:[...input.genres, e.target.value]
//       }
        
//       )
//     }

//     const [image, setImage] = useState();
//     const onChangeIM = e => setImage(URL.createObjectURL(e.target.files[0]));
  
  
//  function handleSubmit(e){
//     e.preventDefault();
//     console.log(input)
//     dispatch(postVideogames(input))
//     alert("videogame created!")
//     setInput({ name:"",
//     rating:"",
//     released:"",
//     platforms:"",
//     genres:[],
//     image:"",
//     })
//  }
//     useEffect(()=>{
//         dispatch(getGenres())
//         dispatch(getVideogames())
//     },[dispatch]);

//     let platforms = [
//         "PC",
//         "PlayStation 5",
//         "Xbox One",
//         "PlayStation 4",
//         "Xbox Series S/X",
//         "Nintendo Switch",
//         "iOS",
//         "Android",
//         "Nintendo 3DS",
//         "Nintendo DS",
//         "Nintendo DSi",
//         "macOS",
//         "Linux",
//         "Xbox 360",
//         "Xbox",
//         "PlayStation 3",
//         "PlayStation 2",
//         "PlayStation",
//         "PS Vita",
//         "PSP",
//         "Wii U",
//         "Wii",
//         "GameCube",
//         "Nintendo 64",
//         "Game Boy Advance",
//         "Game Boy Color",
//         "Game Boy",
//         "SNES",
//         "NES",
//         "Classic Macintosh",
//         "Apple II",
//         "Commodore / Amiga",
//         "Atari 7800",
//         "Atari 5200",
//         "Atari 2600",
//         "Atari Flashback",
//         "Atari 8-bit",
//         "Atari ST",
//         "Atari Lynx",
//         "Atari XEGS",
//         "Genesis",
//         "SEGA Saturn",
//         "SEGA CD",
//         "SEGA 32X",
//         "SEGA Master System",
//         "Dreamcast",
//         "3DO",
//         "Jaguar",
//         "Game Gear",
//         "Neo Geo",
//     ];
//     function handleChangePlatforms(e) {
//         setInput({
//             ...input,
//             platforms:[...input.platforms, e.target.value]
//           }
            
//           )
//         }

//     return(
    
//     // <Link to="/home"><button>Back</button></Link>
//     <div className="createTop"> 
//         <div >  <Link style={{ textDecoration: 'none'}} 
//         to='/home'> <button className="btn3"> go back</button></Link>
//         <h1> create a videogame</h1>
//         </div>
//         <form  className="Createcontainer" onSubmit={e=>handleSubmit(e)}>
// <div>
//     <label>Name</label>
//     <input type="text"
//     value={input.name}
//     name="name" onChange={e=>handleChange(e)}
//     />
// </div>
// <div>

//     <label>Rating</label>
//     <input type="number"
//     value={input.rating}
//     name="rating"onChange={e=> handleChange(e)}/>
// </div>
// <div>
//     <label>Image</label>
//       <input type="file" onChange={onChangeIM} />
//         {image && <img className="imgloaded" src={image} alt="The current file" />}
    
// </div>
// <div>
// <label> Genres</label>
// <select onChange={(e)=>handleSelect(e)}> 
//     {genres&&genres.map((g)=>(
//         <option value={g.name}>{g.name}</option>
//     ) 
//     )}
   
// </select>
// </div>
// <div>
//     <label> Platforms</label>
    
// <select required name="platforms"  onChange={(e) => handleChangePlatforms(e)}>
//                         <option hidden={true}>Select some platforms</option>
//                         {platforms.map(pl => <option value={pl}>{pl}</option>)}
//                     </select>
//                     </div>
// <ul><li className="listof"> {input.genres.map(g=> g + ",")}</li></ul>
// <ul><li className="listof"> {input.platforms.map(g=> g + ",")}</li></ul>
// <button className="btn4" type="submit"> create</button>
// <div>
// </div>
//         </form>
//         </div>

        

//     )
// }








import React from "react";
import { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { postVideogames, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./Create.css";

function validate(input){
    let errors = {}
    //El titulo no puede: ser nulo o incluir caracteres peligrosos.
    if(!input.name || input.title?.name < 1 || input.name?.includes("<") || input.name?.includes(">") || input.name?.includes("@")) errors.name = "Debes ingresar un titulo sin caracteres especiales."
    
    //La descripción no puede ser: Menor a 50 caracteres, tener menos de 5 palabras, ni incluir caracteres peligrosos.
    if(!input.description || input.description?.length < 50 || input.description?.split(" ").length <= 5 || input.description?.includes("<") || input.description?.includes(">") || input.description?.includes("@")) errors.description = "Debes ingresar una descripcion de al menos 50 caracteres con más de 5 palabras, sin caracteres especiales."
    
    //Al menos un genero es necesario.
    if(input.genres?.length < 1) errors.genres = "Debes seleccionar al menos un genero."
    
    //Al menos una plataforma es necesaria.
    if(input.platforms?.length < 1) errors.platforms = "Debes ingresar al menos una plataforma."
    
    //El rating no puede ser mayor a 5 ni menor a 0.
    if(input.rating > 5 || input.rating < 0) errors.rating = "El valor debe estar dentro del rango de 0-5"
    
    return errors
}

export default function Create(){
    const dispatch=useDispatch()
    const history=useHistory()
    const genres=useSelector((state)=>state.genres)
    const[errors, setErrors]=useState({});
    // console.log(genres)

    const[input, setInput]=useState({
        name:"",
        released:"",
        rating:"",
        description:"",
        background_image:"",
        platforms:[],
        genres:[],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }
    function handleSelect(e){
        setInput({
            ...input,
            genres:[...input.genres, e.target.value]
        })
    }

    // const [image, setImage] = useState();
    // const onChangeIM = e => setImage(URL.createObjectURL(e.target.files[0]));

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postVideogames(input))
        alert("Videogame created")
        setInput({
            name:"",
            released:"",
            rating:"",
            description:"",
            background_image:"",
            platforms:"",
            genres:[],       
        })
        history.push("/home")
    }
   

    useEffect(()=>{
        dispatch(getGenres())
    }, []);

    let platforms = [
        "PC",
        "PlayStation 5",
        "Xbox One",
        "PlayStation 4",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "Game Boy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
    ];
    // function handleChangePlatforms(e) {
    //     setInput({
    //         ...input,
    //         platforms:[...input.platforms, e.target.value]
    //     }     )
    // }
    function handleChangePlatforms(e){
        const platforms = input.platforms.includes(e.target.value) ? 
        alert("equal platforms cannot be added"):  
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value] //si quiero muchos ponerlo asi [...input.temperament,e.target.value]
        })
    }
    function handleDeletePlatforms(e){
        e.preventDefault()
        setInput({
            ...input,
            platforms: [] 
        });
        console.log(input)
    }
    function handleDeleteGenres(e){
        e.preventDefault()
        setInput({
            ...input,
            genres: [] 
        });
        console.log(input)
    }
    

    return(
        <div className="createTop">
            
            <Link to="/home"><button className="btn3">Back</button></Link>
            <h1>Create your videogame</h1>
            <form className="Createcontainer" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type="text"
                    value= {input.name}
                    name= "name"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Description:</label>
                    <input
                    type="text"
                    value={input.description}
                    name="description"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors&&errors.description &&  (
                        <p>{errors.description}</p>
                    )}
                </div>
                
                <div>
                    <label>Rating:</label>
                    <input
                    type="number"
                    value={input.rating}
                    name="rating"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors&&errors.rating &&(
                        <p>{errors.rating}</p>
                    )}
                </div>
                <div>
                    <label>Release date:</label>
                    <input
                    type="text"
                    value={input.released}
                    name="released"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.released &&(
                        <p>{errors.released}</p>
                    )}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    type="text"
                    value={input.background_image}
                    name="background_image"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label> Platforms:</label>
                    <select required name="platforms"  onChange={(e) => handleChangePlatforms(e)}>
                    <option hidden={true}>Select some platforms</option>
                    {platforms.map(pl => <option value={pl}>{pl}</option>)}
                    </select>
                </div>
                <div>
                <label >Genres:</label>
                <select required name="genres" onChange={(e)=>handleSelect(e)}>
                    {genres&&genres.map((s)=>(
                        <option value={s.name}>{s.name}</option>
                    ))}
                </select>
                </div>
                <ul><li> {input.platforms.map(g=> g + ",")}</li></ul>
                <button onClick={(e)=>handleDeletePlatforms(e)}>X</button>
                <ul><li>{input.genres.map(s=>s + ",")}</li></ul>
                <button onClick={(e)=>handleDeleteGenres(e)}>X</button>
                <button className="btn4" type="submit" disabled={Object.entries(errors).length===0 ? false : true}>Create videogame</button>
            </form>
        </div>
    )
}



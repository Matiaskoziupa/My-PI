const axios= require("axios");
const {Videogame, Genre}= require("../db")
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res)=>{
    try{
        const apiInfo= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322");
        const apiData= apiInfo.data.results.map((s)=>{
            const obj={
            id:s.id,
            name:s.name,
            description:s.description,
            release_date:s.released,
            rating:s.rating,
            platforms:s.platforms.map(s=>s.platform.name),
            background_image:s.background_image,
            createdInDb:s.createdInDb,
            }   
        return obj;
        })
        const getDbInfo= await Videogame.findAll({include:[{model:Genre}]});
        const suma=[...apiData,...getDbInfo];
        res.status(200).json(suma);
    } catch(error){
        res.status(404).json({error:error.message});
    }
})




module.exports = router;

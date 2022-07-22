const axios= require("axios");
const {Videogame, Genre}= require("../db")
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo= async()=>{
    const apiInfo= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322");
    const apiData= apiInfo.data.results.map((s)=>{
        const obj={    
            name:s.name,
            genres:s.genres.map(s=>s.name),
            image:s.background_image,
        }   
    return obj;
    })
}
const getDbInfo= async()=>{

}

router.get("/videogames", async (req, res)=>{
    try{
        const apiInfo= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322");
        const apiData= apiInfo.data.results.map((s)=>{
            const obj={    
            name:s.name,
            genres:s.genres.map(s=>s.name),
            image:s.background_image,
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
router.get("/genres", (req, res)=>{
    try{
        axios.get("https://api.rawg.io/api/genres?key=e145758c71a14c72bd4afd6699d4d322").then((response)=>{
            let aux=response.data.results.map((s)=>{
                const obj={
                    id:s.id,
                    name:s.name,
                }
                return obj;
            });
            Genre.bulkCreate(aux)
            res.json({msg:"Success"});
        });
    } catch(error){
        res.status(404).json({error:error.message})
    }
});
// router.post("/videogames", async(req, res)=>{
//     const {name, description, released, rating, platforms, background_image, genres}=req.body;
//     if(!name || !description || !platforms){
//         res.status(400).json({msg:"Faltan datos"})
//     }
//     if (!name || typeof name !== "string") {
//         return res.status(404).json({ error: "Invalid name" });
//     }
//     if (!description || typeof description !== "string") {
//         return res.status(404).json({ error: "Invalid description" });
//     }
//     if (!platforms || typeof platforms !== "string") {
//         return res.status(404).json({ error: "Invalid platforms" });
//     }
//     if (!genres) {
//         return res.json({ error: "Invalid genres" });
//     }
//     if (rating) {
//         if (typeof rating !== "number") {
//             return res.status(404).json({ error: "Invalid rating" });
//         }
//     }
//     if(released){
//         if(typeof released!=="string"){
//             return res.status(404).json({error:"Invalid released"});
//         }
//     }

//     try{
//         const obj={name, description,released, rating, platforms, background_image}
//         const newGame= await Videogame.create(obj)
//         // console.log("MODELO", Videogame.__proto__);
//         // console.log("ENTIDAD", newGame.__proto__);
//         newGame.addGenre(genres)
//         const aux=Videogame.findByPk(newGame.id, {
//             include: [{model: Genre}],
//     });
//     res.status(201).send(aux);
// } catch(error){
//     res.status(404).json({error: error.message})
// }
// })
router.post("/videogames", async (req, res) => {
    const {background_image, name, release_date, genres, rating, description, platforms, createdInDb} = req.body;
    
        const newVideogame = await Videogame.create({
            background_image,
            name,
            release_date,
            createdInDb,
            rating,
            description,
            platforms
        });
        let genresDb= await Genre.findAll({
            where: {name:genres}
        })
        newVideogame.addGenre(genresDb)
        res.send("Videogame created succesfully")
});
router.get("/videogame/:id", async (req, res)=>{
    const {id}=req.params;
    const apiInfo= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322")
    const apiRta=apiInfo.data.results.map((s)=>{
        const obj={
            name:s.name,
            id:s.id,
            genre:s.genres.map(s=>s.name),
            description:s.description,
            release_date:s.released,
            rating:s.rating,
            platforms:s.platforms.map(s=>s.platform.name),
            image:s.background_image
        }
        return obj;
    })
    const getDbInfo= await Videogame.findAll({include:[{model:Genre}]});
    const suma=[...apiRta,...getDbInfo];
    if(id){
        let videogameId= await suma.filter(s=> s.id==id)
        videogameId.length?
        res.status(200).json(videogameId) :
        res.status(404).json("Not Found")
    }
})

// router.get("/videogame/:id", async (req, res)=>{
//     const { idVideogame } = req.params
//     if (idVideogame.includes()) {
//         let videogameDb = await Videogame.findOne({
//             where: {
//                 id: idVideogame,
//             },
//             include: Genre
//         })
//         videogameDb = JSON.stringify(videogameDb);
//         videogameDb = JSON.parse(videogameDb);
//         videogameDb.genres = videogameDb.genres.map(g => g.name);
//         res.json(videogameDb)
//     };

//     try {
//         const response = await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322");
//         let { name, background_image, genres, description, released: releaseDate, rating, platforms }
//          = response.data;
//         genres = genres.map(g => g.name);
//         platforms = platforms.map(p => p.platform.name);
//         return res.json({
//             name,
//             background_image,
//             genres,
//             description,
//             releaseDate,
//             rating,
//             platforms
//         })
//     } catch (err) {
//         return console.log(err)
//     }
// })
router.get("/games/:name", async(req, res)=>{
    const {name}=req.params;
    const apiInfo= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322")
    const apiRta=apiInfo.data.results.map((s)=>{
        const obj={
            name:s.name,
        }
        return obj;
    })
    const getDbInfo= await Videogame.findAll({include:[{model:Genre}]});
    const suma=[...apiRta,...getDbInfo];
    if(name){
        let nameVideogame= await suma.filter(s=> s.name.toLowerCase().includes(name.toLowerCase()))
        nameVideogame.length?
        res.status(200).json(nameVideogame) :
        res.status(404).json("Not Found")
    }
})

module.exports = router;

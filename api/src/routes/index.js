const axios= require("axios");
const {Videogame, Genre}= require("../db")
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/videogames", async (req, res)=>{
    const {name}=req.query;
        const apiInfo= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322");
        // const apiInfo2= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322&page=2");
        // const apiInfo3= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322&page=3");
        // const apiInfo4= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322&page=4");
        // const apiInfo5= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322&page=5");
        // const apiInfoTotal=[...apiInfo,...apiInfo2,...apiInfo3,...apiInfo4,...apiInfo5];

        const apiData= apiInfo.data.results.map((s)=>{
            const obj={    
            name:s.name,
            genres:s.genres.map(s=>s.name),
            image:s.background_image,
            }   
        return obj;
        })
        const apiInfo2= await axios.get(apiInfo.data.next);
        const apiData2= apiInfo2.data.results.map((s)=>{
            const obj={    
            name:s.name,
            genres:s.genres.map(s=>s.name),
            image:s.background_image,
            }   
        return obj;
        })
        const apiInfo3= await axios.get(apiInfo2.data.next);
        const apiData3= apiInfo3.data.results.map((s)=>{
            const obj={    
            name:s.name,
            genres:s.genres.map(s=>s.name),
            image:s.background_image,
            }   
        return obj;
        })
        const apiInfo4= await axios.get(apiInfo3.data.next);
        const apiData4= apiInfo4.data.results.map((s)=>{
            const obj={    
            name:s.name,
            genres:s.genres.map(s=>s.name),
            image:s.background_image,
            }   
        return obj;
        })
        const apiInfo5= await axios.get(apiInfo4.data.next);
        const apiData5= apiInfo5.data.results.map((s)=>{
            const obj={    
            name:s.name,
            genres:s.genres.map(s=>s.name),
            image:s.background_image,
            }   
        return obj;
        })
        const apiDataTotal=[...apiData,...apiData2,...apiData3,...apiData4,...apiData5];
        try{
            const getDbInfo= await Videogame.findAll({include:[{model:Genre}]});
            const suma=[...apiDataTotal,...getDbInfo];
            if(name){
                let nameVideogame= await suma.filter(s=> s.name.toLowerCase().includes(name.toLowerCase()))
                nameVideogame.length?
                res.status(200).json(nameVideogame) :
                res.status(404).send("Not Found")  
            } else{
                res.status(200).json(suma);
            }
        }catch(error){
            res.status(404).json({error:error.message})
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
            res.json(aux);
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
    if(!name || !description || !platforms) return res.status(400).send("Faltan enviar datos obligatorios")
    const nameRepeat= await Videogame.findOne({
        where: {name: name.toLowerCase()}
    });
    if(nameRepeat) return res.status(400).send("name repeat")
    console.log(nameRepeat)
    
    //falta validacion nombreapi
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


module.exports = router;

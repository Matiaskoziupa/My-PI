require('dotenv').config();
const axios= require("axios");
const {Videogame, Genre}= require("../db")
const { Router } = require('express');
const { getAllGenres } = require('./controllers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// // const URL = 'https://api.rawg.io/api/games'
// router.get("/videogames", async (req, res)=>{

    
//     //     let videogamesDb = await Videogame.findAll({
//     //         include: Genre
//     //     });
//     //     //Parsear obj to json
//     //     videogamesDb = JSON.stringify(videogamesDb);
//     //     videogamesDb = JSON.parse(videogamesDb);
//     //     //just gender.name
//     //     videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
           
//     //         ...el,
//     //         genres: el.genres.map(g => g.name)
//     //     }), [])
    
//     //     if (req.query.name) {
//     //         try {
//     //             let name = req.query.name;
//     //             let response = await axios.get(`"https://api.rawg.io/api/games?search=${name}&key=e145758c71a14c72bd4afd6699d4d322`);
//     //             if (!response.data.count) return res.status(404).send(`No se encontro ningun videojuego con el nombre "${req.query.name}"`);
               
//     //             //count to count ;)
//     //             response.data.results = response.data.results.reduce((acc, el) => acc.concat({
//     //                 // DB
//     //                 ...el,
//     //                 genres: el.genres.map(g => g.name)
//     //             }), [])
//     //             const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
                
//     //             const results = [...filteredGamesDb, ...response.data.results.splice(0, 15)];
              
//     //             return res.json(results)
//     //         } catch (err) {
//     //             return console.log(err)
//     //         }
//     //     } else {
//     //         try {
//     //             let pages = 0;
//     //             let results = [...videogamesDb];// brigns state
//     //             let response = await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322");
//     //             //axios brings api data
//     //             while (pages < 4) {
//     //                 pages++;
//     //                 response.data.results = response.data.results.reduce((acc, el) => acc.concat({
//     //                     // data results y concatena
//     //                     ...el,
//     //                     genres: el.genres.map(g => g.name)
//     //                 }), [])
//     //                 results = [...results, ...response.data.results]//saving in results array
                   
//     //                 response = await axios.get(response.data.next)
//     //             }
//     //             return res.json(results)
//     //         } catch (err) {
//     //             console.log(err)
//     //             return res.sendStatus(500)
//     //         }
//     //     }
//     // })

//     const {name}=req.query;
//         const apiInfo= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322");
//         const apiData= apiInfo.data.results.map((s)=>{
//             const obj={    
//             name:s.name,
//             genres:s.genres.map(s=>s.name),
//             image:s.background_image,
//             rating:s.rating,
//             platforms:s.platforms.map(s=>s.platform).map(s=>s.name),
//             description:s.description,
//             released:s.released            
//         }   
//         return obj;
//         })
//         const apiInfo2= await axios.get(apiInfo.data.next);
//         const apiData2= apiInfo2.data.results.map((s)=>{
//             const obj={    
//             name:s.name,
//             genres:s.genres.map(s=>s.name),
//             image:s.background_image,
//             rating:s.rating,
//             platforms:s.platforms.map(s=>s.platform).map(s=>s.name),
//             description:s.description,
//             released:s.released
//             }   
//         return obj;
//         })
//         const apiInfo3= await axios.get(apiInfo2.data.next);
//         const apiData3= apiInfo3.data.results.map((s)=>{
//             const obj={    
//             name:s.name,
//             genres:s.genres.map(s=>s.name),
//             image:s.background_image,
//             rating:s.rating,
//             platforms:s.platforms.map(s=>s.platform).map(s=>s.name),
//             description:s.description,
//             released:s.released
//             }   
//         return obj;
//         })
//         const apiInfo4= await axios.get(apiInfo3.data.next);
//         const apiData4= apiInfo4.data.results.map((s)=>{
//             const obj={    
//             name:s.name,
//             genres:s.genres.map(s=>s.name),
//             image:s.background_image,
//             rating:s.rating,
//             platforms:s.platforms.map(s=>s.platform).map(s=>s.name),
//             description:s.description,
//             released:s.released         
//         }   
//         return obj;
//         })
//         const apiInfo5= await axios.get(apiInfo4.data.next);
//         const apiData5= apiInfo5.data.results.map((s)=>{
//             const obj={    
//             name:s.name,
//             genres:s.genres.map(s=>s.name),
//             image:s.background_image,
//             rating:s.rating,
//             platforms:s.platforms.map(s=>s.platform).map(s=>s.name),
//             description:s.description,
//             released:s.released
//             }   
//         return obj;
//         })
//         const apiDataTotal=[...apiData,...apiData2,...apiData3,...apiData4,...apiData5];
//         try{
//             const getDbInfo= await Videogame.findAll({include:[{model:Genre}]});
//             const suma=apiDataTotal.concat(getDbInfo);
//             if(name){
//                 let nameVideogame= await suma.filter(s=> s.name.toLowerCase().includes(name.toLowerCase()))
//                 nameVideogame.length?
//                 res.status(200).json(nameVideogame) :
//                 res.status(404).send("Not Found")  
//             } else{
//                 res.status(200).json(suma);
//             }
//         }catch(error){
//             console.log(error)
//         }
// })
// router.get("/genres", async(req, res)=>{
//     const genresDb = await Genre.findAll();
    
//     const response = await axios.get("https://api.rawg.io/api/genres?key=e145758c71a14c72bd4afd6699d4d322");
//     const genres = response.data.results;
//     genres.forEach(async (g)=> {
//         await Genre.findOrCreate({
//             where: {
//                 name: g.name
//             }
//         })
//     })
//     res.send(genresDb)
// })
// //     try{
// //         axios.get("https://api.rawg.io/api/genres?key=e145758c71a14c72bd4afd6699d4d322").then((response)=>{
// //             let aux=response.data.results.map((s)=>{
// //                 const obj={
// //                     id:s.id,
// //                     name:s.name,
// //                 }
// //                 return obj;
// //             });
// //             Genre.bulkCreate(aux)
// //             res.json(aux);
// //         });
// //     } catch(error){
// //         res.status(404).json({error:error.message})
// //     }
// // });
// // router.post("/videogames", async(req, res)=>{
// //     const {name, description, released, rating, platforms, background_image, genres}=req.body;
// //     if(!name || !description || !platforms){
// //         res.status(400).json({msg:"Faltan datos"})
// //     }
// //     if (!name || typeof name !== "string") {
// //         return res.status(404).json({ error: "Invalid name" });
// //     }
// //     if (!description || typeof description !== "string") {
// //         return res.status(404).json({ error: "Invalid description" });
// //     }
// //     if (!platforms || typeof platforms !== "string") {
// //         return res.status(404).json({ error: "Invalid platforms" });
// //     }
// //     if (!genres) {
// //         return res.json({ error: "Invalid genres" });
// //     }
// //     if (rating) {
// //         if (typeof rating !== "number") {
// //             return res.status(404).json({ error: "Invalid rating" });
// //         }
// //     }
// //     if(released){
// //         if(typeof released!=="string"){
// //             return res.status(404).json({error:"Invalid released"});
// //         }
// //     }

// //     try{
// //         const obj={name, description,released, rating, platforms, background_image}
// //         const newGame= await Videogame.create(obj)
// //         // console.log("MODELO", Videogame.__proto__);
// //         // console.log("ENTIDAD", newGame.__proto__);
// //         newGame.addGenre(genres)
// //         const aux=Videogame.findByPk(newGame.id, {
// //             include: [{model: Genre}],
// //     });
// //     res.status(201).send(aux);
// // } catch(error){
// //     res.status(404).json({error: error.message})
// // }
// // })
// router.post("/videogames", async (req, res) => {
// //     const {image, name, released, genres, rating, description, platforms, createdInDb} = req.body;
// //     if(!name || !description || !platforms) return res.status(400).send("Faltan enviar datos obligatorios")
// //     const nameRepeat= await Videogame.findOne({
// //         where: {name: name.toLowerCase()}
// //     });
// //     if(nameRepeat) return res.status(400).send("name repeat")
// //     console.log(nameRepeat)
    
// //     //falta validacion nombreapi
// //         const newVideogame = await Videogame.create({
// //             image,
// //             name,
// //             released,
// //             createdInDb,
// //             rating,
// //             description,
// //             platforms
// //         });
// //         let genresDb= await Genre.findAll({
// //             where: {name:genres}
// //         })
// //         newVideogame.addGenre(genresDb)
// //         res.send("Videogame created succesfully")
// // });
// const {image, name, released, genres, rating, description, platforms} = req.body;
// // if(!name || !description || !platforms){
// //             res.status(400).json({msg:"Faltan datos"})
// //         }
// //         if (!name || typeof name !== "string") {
// //             return res.status(404).json({ error: "Invalid name" });
// //         }
// //         if (!description || typeof description !== "string") {
// //             return res.status(404).json({ error: "Invalid description" });
// //         }
// //         if (!platforms || typeof platforms !== "string") {
// //             return res.status(404).json({ error: "Invalid platforms" });
// //         }
// //         if (!genres) {
// //             return res.json({ error: "Invalid genres" });
// //         }
// //         if (rating) {
// //             if (typeof rating !== "number") {
// //                 return res.status(404).json({ error: "Invalid rating" });
// //             }
// //         }
// //         if(released){
// //             if(typeof released!=="string"){
// //                 return res.status(404).json({error:"Invalid released"});
// //             }
// //         }
//     try {
//         const newVideogame = await Videogame.create({
//             image,
//             name,
//             released,
//             genres,
//             rating,
//             description,
//             platforms
//         });
//         genres?.forEach(async g => {
//             var foundGenre = await Genre.findOne({
//                 where: {name: genres}
//             });
//             newVideogame.addGenre(foundGenre);
//         });
//         res.send(newVideogame);
//     } catch (error) {
//         res.json({error:error.message})
        
//     }
// });
// // router.get("/videogame/:id", async (req, res)=>{
// //     const id=req.params.id;
// //     const apiInfo= await axios.get("https://api.rawg.io/api/games?key=e145758c71a14c72bd4afd6699d4d322")
// //     const apiRta=apiInfo.data.results.map((s)=>{
// //         const obj={
// //             name:s.name,
// //             id:s.id,
// //             genre:s.genres.map(s=>s.name),
// //             description:s.description,
// //             released:s.released,
// //             rating:s.rating,
// //             platforms:s.platforms.map(s=>s.platform.name),
// //             image:s.background_image
// //         }
// //         return obj;
// //     })
// //     const getDbInfo= await Videogame.findAll({include:[{model:Genre}]});
// //     const suma=[...apiRta,...getDbInfo];
// //     if(id){
// //         let videogameId= await suma.filter(s=> s.id==id)
// //         videogameId.length?
// //         res.status(200).json(videogameId) :
// //         res.status(404).json("Not Found")
// //     }
// // })

// router.get('/videogame/:id', async (req, res) => {
//     const { id } = req.params
//     if (id.includes('-')) {
//         let videogameDb = await Videogame.findOne({
//             where: {
//                 id: id,
//             },
//             include: Genre
//         })
//         videogameDb = JSON.stringify(videogameDb);
//         videogameDb = JSON.parse(videogameDb);
//         videogameDb.genres = videogameDb.genres.map(g => g.name);
//         res.json(videogameDb)
//     };

//     try {
//         const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=e145758c71a14c72bd4afd6699d4d322`);
//         let { name, background_image: image, genres, description, released, rating, platforms }
//          = response.data;
//         genres = genres.map(g => g.name);
//         platforms = platforms.map(p => p.platform.name);
//         return res.json({
//             name,
//             image,
//             genres,
//             description,
//             released,
//             rating,
//             platforms
//         })
//     } catch (err) {
//         return console.log(err)
//     }
// })
// // router.put('/:id', async (req, res, next) => {
// //     try {
// //         const { id } = req.params;
// //         const videogame = req.body;
// //         await Videogame.update(videogame, {
// //             where: {
// //                 id: id
// //             }
// //         });
// //         res.status(200).send(`The videogame with id ${id} was updated`);
// //     } catch (error) {
// //         next(error)
// //     }
// // });







const URL = 'https://api.rawg.io/api/games'


router.get('/videogames', async (req, res) => {
    let videogamesDb = await Videogame.findAll({
        include: Genre
    });
    //Parsear obj to json
    videogamesDb = JSON.stringify(videogamesDb);
    videogamesDb = JSON.parse(videogamesDb);
    //just gender.name
    videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
       
        ...el,
        genres: el.genres.map(g => g.name)
    }), [])

    if (req.query.name) {
        try {
            let name = req.query.name;
            let response = await axios.get(`${URL}?search=${name}&key=e145758c71a14c72bd4afd6699d4d322`);
            if (!response.data.count) return res.status(404).send(`No se encontro ningun videojuego con el nombre "${req.query.name}"`);
           
            //count to count ;)
            response.data.results = response.data.results.reduce((acc, el) => acc.concat({
                // DB
                ...el,
                genres: el.genres.map(g => g.name)
            }), [])
            const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            
            const results = [...filteredGamesDb, ...response.data.results.splice(0, 15)];
          
            return res.json(results)
        } catch (err) {
            return console.log(err)
        }
    } else {
        try {
            let pages = 0;
            let results = [...videogamesDb];// brigns state
            let response = await axios.get(`${URL}?key=e145758c71a14c72bd4afd6699d4d322`);
            //axios brings api data
            while (pages < 4) {
                pages++;
                response.data.results = response.data.results.reduce((acc, el) => acc.concat({
                    // data results y concatena
                    ...el,
                    genres: el.genres.map(g => g.name)
                }), [])
                results = [...results, ...response.data.results]//saving in results array
               
                response = await axios.get(response.data.next)
            }
            return res.json(results)
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
})



// GET /videogame/:idVideoGame
router.get('/videogame/:idVideogame', async (req, res) => {
const { idVideogame } = req.params
if (idVideogame.includes('-')) {
    let videogameDb = await Videogame.findOne({
        where: {
            id: idVideogame,
        },
        include: Genre
    })
    videogameDb = JSON.stringify(videogameDb);
    videogameDb = JSON.parse(videogameDb);
    videogameDb.genres = videogameDb.genres.map(g => g.name);
    res.json(videogameDb)
};

try {
    const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=e145758c71a14c72bd4afd6699d4d322`);
    let { name, background_image, genres, description, released: releaseDate, rating, platforms }
     = response.data;
    genres = genres.map(g => g.name);
    platforms = platforms.map(p => p.platform.name);
    return res.json({
        name,
        background_image,
        genres,
        description,
        releaseDate,
        rating,
        platforms
    })
} catch (err) {
    return console.log(err)
}
})
// GET a /genres

// router.get('/genres', async (req, res) => {
// const genresDb = await Genre.findAll();

// const response = await axios.get(`https://api.rawg.io/api/genres?key=e145758c71a14c72bd4afd6699d4d322`);
// const genres = response.data.results;
// genres.forEach(async (g)=> {
//     await Genre.findOrCreate({
//         where: {
//             name: g.name
//         }
//     })
// })
// res.send(genresDb)
// })
router.get("/genres", async (req, res)=>{
    try{
        let genres= await getAllGenres();
        res.json(genres);
    } catch(error){
        res.send(error)
    }
})
//POST a /videogame

router.post('/videogame', async (req, res, next) => {
// const {background_image, name, released, genres, rating, description, platforms} = req.body;
// try {
//     const newVideogame = await Videogame.create({
//         background_image,
//         name,
//         released,
//         genres,
//         rating,
//         description,
//         platforms
//     });
//     genres?.forEach(async g => {
//         var foundGenre = await Genre.findOne({
//             where: {name: genres}
//         });
//         newVideogame.addGenre(foundGenre);
//     });
//     res.send(newVideogame);
// } catch (error) {
//     next(error)
// }
// });




const {background_image, name, released, genres, rating, description, platforms} = req.body;
try{
    let newVideogame=await Videogame.create({
        name,
        description,
        background_image,
        released,
        rating,
        platforms,
    });
    let genreDb= await Genre.findAll({
        where: {
            name:
            genres
        },
    });
    newVideogame.addGenre(genreDb);
    res.send("Videogame created")
} catch(error){
    console.log(error)
}
})




//


// //put

// router.put('/:id', async (req, res, next) => {
// try {
//     const { id } = req.params;
//     const videogame = req.body;
//     await Videogame.update(videogame, {
//         where: {
//             id: id
//         }
//     });
//     res.status(200).send(`The videogame with id ${id} was updated`);
// } catch (error) {
//     next(error)
// }
// });

// Config routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

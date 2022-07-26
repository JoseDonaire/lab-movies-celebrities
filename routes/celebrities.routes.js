const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")




// GET 
router.get("/create",  (req, res, next) => {
        res.render("celebrities/new-celebrity.hbs")
})
  
  // POST 
router.post("/create", (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({
        name,
        occupation,
        catchPhrase
    })
    .then(() => {
        res.redirect("/celebrities")
    })
    .catch((err) => {
      next(err)
    })
})

  //lista famosos
router.get("/",  (req, res, next) => {
    Celebrity.find().select("name")
    .then((listCelebs)=>{ 
        res.render("celebrities/celebrities.hbs",{
        listCelebs
     })
    }).catch((err) => {
        next(err)
      }) 
})



module.exports = router;
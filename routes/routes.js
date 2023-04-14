const express = require("express");
const router = express.Router();
const Star = require('../models/stars');
const multer = require('multer');
const { error } = require("console");
const stars = require("../models/stars");

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads');
    },
    filename: function(req, file ,cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
})

var upload = multer({
    storage:storage,
}).single('image');


//insert star into database
router.post ("/add", upload,(req, res)=>{
   const star= new Star({
    name: req.body.name,
    coordinates:req.body.coordinates,
    description:req.body.description,
    image:req.file.filename,
   })
   star.save()
   .then(() => {
      req.session.message={
          type:'success',
          message:'Star added successfully!'
      }
      res.redirect("/")
   })
   .catch((error) => {
      res.json({message: error.message, type:'danger'});
   })
})

//get stars
router.get ("/", (req, res)=>{
    Star.find().then((stars)=>{
        res.render("index", {
            title: "Home Page",
            stars: stars,
        });
    }).catch((error)=>{
        res.json({message:error.message});
    });
})
router.get ("/add", (req, res)=>{
    res.render("add_star", {title:'Add'});
})

module.exports= router;
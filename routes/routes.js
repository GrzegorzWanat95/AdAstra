const express = require("express");
const router = express.Router();
const Star = require('../models/stars');
const Constellation = require('../models/constellations');
const multer = require('multer');
const { error, debug } = require("console");
const tars = require("../models/stars");
const fs = require("fs");

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

// router.get('/', async (req, res) => {
//     try {
//       const stars = await Star.find();
//       res.render('index', {
//         title: 'Home Page',
//         stars: stars,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send('Wystąpił błąd');
//     }
//   });
router.get('/', async (req, res) => {
  try {
    const stars = await Star.find();
    const constellations = await Constellation.find().populate('stars');
    const constellationStars = constellations.flatMap(constellation => constellation.stars);
    res.render('index', {
      title: 'Stars and Constellations',
      stars: stars,
      constellations: constellations,
      constellationStars: constellationStars,
      showStars: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});








///Constelations
router.post('/addConstellation', upload, (req, res) => {
  const constellation = new Constellation({
    name: req.body.name,
    description: req.body.description,
    image: req.file.filename,
    stars: req.body.stars
  });

  constellation.save()
    .then(() => {
      return Star.updateOne(
        { _id: { $in: req.body.stars } },
        { $push: { constellations: constellation._id } }
      );
    })
    .then(() => {
      req.session.message = {
        type: 'success',
        message: 'Constellation added successfully!'
      };
      res.redirect('/');
    })
    .catch(error => {
      res.json({ message: error.message, type: 'danger' });
    });
});

router.get('/addConstellation', (req, res) => {
  Star.find()
    .then(stars => {
      res.render('add_constellation', {                title: "Add Constellation",
      stars: stars });
    })
    .catch(error => {
      res.json({ message: error.message, type: 'danger' });
    }) 
});


//insert star into database
router.post ("/add", upload,(req, res)=>{
   const star= new Star({
    name: req.body.name,
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

//edit star
router.get('/edit/:id', (req,res)=>{
    let id = req.params.id;
    Star.findById(id)
    .then((star) => {
        if (!star) {
            res.redirect("/");
        } else {
            res.render("edit_star", {
                title: "Edit Star",
                star: star,
            });
        }
    })
    .catch((error) => {
        console.log(error);
        res.redirect("/");
    });
})
//edit post
router.post('/edit/:id', upload,(req,res)=>{
    let id = req.params.id;
    let new_image="";
    if (req.file) {
        new_image= req.file.filename;
        try{
            fs.unlinkSync('./uploads/'+req.body.old_image);    
        }
        catch(error){
            console.log(error);
        }
    }
    else{
        new_image = req.body.old_image;
    }
    Star.findByIdAndUpdate(id, {
        name: req.body.name,
        description:req.body.description,
        image:new_image,
       })
    .then((star) => {
        console.log(        req.body.name,
            req.body.description,
            new_image,)
        req.session.message={
            type:'success',
            message:'Star updated successfully'
        };
        res.redirect("/");
    })
    .catch((error) => {
        res.json({message:error.message, type:'danger'});
    });
})

router.get('/details/:id', async (req, res) => {
    try {
      const star = await Star.findById(req.params.id);
      res.send(star);
    } catch (err) {
      console.log(err);
      res.status(500).send('Wystąpił błąd');
    }
  });

//delete star
const {promisify} = require('util');
const unlinkAsync = promisify(fs.unlink);

router.get('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const star = await Star.findById(id);
    if (star.image !== '') {
      await unlinkAsync('./uploads/' + star.image);
    }
    await Star.findByIdAndRemove(id);
    req.session.message = {
      type: "info",
      message: "Star deleted successfully",
    };
    res.redirect('/');
  } catch (error) {
    res.json({ message: error.message });
  }
});


router.get ("/add", (req, res)=>{
    res.render("add_star", {title:'Add'});
})

module.exports= router;
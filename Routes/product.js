const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../config/auth')

const { MongoClient, ObjectID } = require("mongodb");

const uri = "mongodb+srv://farjadi:09385065354@webproject.fowis.mongodb.net/WebProject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true});
client.connect(err => {
  useUnifiedTopology: true
  const collection = client.db("ClothingStore").collection("BestProducts");
  console.log('Connected to DB');
  client.close();
});

router.get("/:id",ensureAuth,(req,res) => {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ClothingStore");
        dbo.collection("BestProducts").find({_id: ObjectID(req.params.id)}).toArray()
        .then(results => {
          res.render('./partials/product', {BestProducts: results})
        })
          db.close();
        });
})

router.put('/:id',ensureAuth, function(req,res){
    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      var dbo = db.db("ClothingStore");
      dbo.collection("BestProducts").findOneAndUpdate(
        {_id: ObjectID(req.params.id)},
        {
          $set: {
           title: req.body.title,
           price: req.body.price 
          }
        },
        {
          upsert: true
        }
        )
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))
        db.close();
      });
    res.redirect("/")
  });
module.exports = router;
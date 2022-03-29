const express = require('express');
const router = express.Router();

const { MongoClient, ObjectID } = require("mongodb");

const uri = "mongodb+srv://farjadi:09385065354@webproject.fowis.mongodb.net/WebProject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true});
client.connect(err => {
  useUnifiedTopology: true
  const collection = client.db("ClothingStore").collection("BestProducts");
  console.log('Connected to DB');
  client.close();
});


    router.get('/', function(req,res){
 
      MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
        var dbo = db.db("ClothingStore");
        var dbo2=db.db("ClothingStore");
        var dbo3=db.db("ClothingStore");
        dbo.collection("BestProducts").find({}).toArray(function(err ,bestpro ){  
        dbo2.collection("NewProducts").find({}).toArray(function (err ,newpro  ){
        dbo3.collection("HotProducts").find({}).toArray(function (err ,hotpro  ){
    
          res.render('./partials/shopping', {NewProducts : newpro ,BestProducts: bestpro , HotProducts : hotpro  })
        })
    })
      })
    })
    })

module.exports = router;
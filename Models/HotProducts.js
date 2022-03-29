const mongoose = require('mongoose');

const HotProductsSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
});

const HotProducts = mongoose.model('HotProducts', HotProductsSchema);

module.exports = HotProducts;
const mongoose = require('mongoose');

const BestProductsSchema =  new mongoose.Schema({
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

const BestProducts = mongoose.model('BestProducts', BestProductsSchema);

module.exports = BestProducts;
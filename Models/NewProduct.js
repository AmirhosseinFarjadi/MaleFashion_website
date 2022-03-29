const mongoose = require('mongoose');

const NewProductsSchema =  new mongoose.Schema({
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

const NewProducts = mongoose.model('NewProducts', NewProductsSchema);

module.exports = NewProducts;
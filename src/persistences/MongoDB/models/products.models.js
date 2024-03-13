import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        requiered: true,
        unique:true
    },
    description:{
        type: String,
        requiered: true,
    },
    price:{
        type: Number,
        requiered: true,
    },
    thumbnails:{
        type: String,
        requiered: true,
    },
    code:{
        type: String,
        requiered: true,
        unique:true
    },
    stock:{
        type: Number,
        requiered: true,
    },
    status:{
        type: Boolean,
        requiered: true,
    },
    category:{
        type: String,
        requiered: true,
    }
})

export const productsModels = mongoose.model('products',productsSchema)
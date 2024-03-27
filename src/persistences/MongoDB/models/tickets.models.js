import mongoose from "mongoose"

const ticketsSchema = new mongoose.Schema({
    code:{
        type: String,
        unique: true
    },
    purchase_datetime:{
        type: String
    },
    amount: {
        type: Number
    },
    purchaser: {
        type: String,   
    }
})


export const ticketsModels = mongoose.model('tickets', ticketsSchema)
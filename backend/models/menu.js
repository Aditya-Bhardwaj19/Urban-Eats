import mongoose from "mongoose";
import { Schema } from "mongoose";

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: { 
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });   
const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { randomUUID } from "node:crypto";

const productSchema = new Schema({
    _id: { type: String, default: randomUUID  },
    category: { type: String, required: true },
    object: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: String, default: 'admin' },
    code: { type: String, required: true },
    stock: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: String, required: true },    
},{
    strict:'throw',
    versionKey: false,
})

productSchema.plugin(mongoosePaginate)

export const ProductsModel = model('products', productSchema)

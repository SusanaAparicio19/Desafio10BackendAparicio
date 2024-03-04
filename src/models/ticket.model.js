import mongoose from 'mongoose';
import { randomUUID } from "node:crypto";
const { Schema, model } = mongoose;

const ticketSchema = new Schema({
    _id: { type: String, default: randomUUID },
    code: { type: Number, default: Math.floor(Math.random() * 10000) },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export const TicketsModel = model('Ticket', ticketSchema);


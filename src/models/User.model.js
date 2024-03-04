import mongoose from 'mongoose';
import { randomUUID } from "node:crypto";
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    role: { type: String, default: 'usuario' }
}, {
    strict: 'throw',
    versionKey: false,
    methods: {
        infoPublica: function () {
            return {
                email: this.email,
                nombre: this.nombre,
                apellido: this.apellido,
            };
         },    

        comparePassword: async function (candidatePassword) {
            return bcrypt.compare(candidatePassword, this.password);
        },
        
        resetPassword: async function (newPassword) {
            this.password = await bcrypt.hash(newPassword, 10);
            return this.save();
        }

    },
});

export const UserModel = model('usuarios', userSchema);
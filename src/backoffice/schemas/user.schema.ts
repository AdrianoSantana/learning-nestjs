import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { User } from '../models/user.model';

export type UserDocument = User & Document;

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
})



import { Schema, default as mongoose } from "mongoose";

const UserSchema = new Schema({
    fullName: {
        type: String,  
        required: true     
    },
    username: {
        type: String,
        required: true     
    },
    email: {
        type: String,
        unique: true,
        required: true     
    },
    documentNumber: {
        type: String,
        unique: true,
        required: true     
    },
    password: {
        type: String,
        required: true     
    },
    role: {
        type: String,
        enum: ['storeKeeper', 'user'],
        required: true     
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', UserSchema);

export default User;
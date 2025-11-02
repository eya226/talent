import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
});

export default model('User', userSchema);

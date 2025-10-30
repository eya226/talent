import { Schema, model } from 'mongoose';

const questSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    xp: { type: Number, required: true },
});

export default model('Quest', questSchema);

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    xp: { type: Number, default: 0 },
    completedQuests: [{ type: Schema.Types.ObjectId, ref: 'Quest' }],
});

export default model('User', userSchema);

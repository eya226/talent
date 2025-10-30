import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    requiredXp: { type: Number, required: true },
    requiredQuests: [{ type: Schema.Types.ObjectId, ref: 'Quest' }],
});

export default model('Job', jobSchema);

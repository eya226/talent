import { Schema, model } from 'mongoose';

const resourceSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
});

export default model('Resource', resourceSchema);

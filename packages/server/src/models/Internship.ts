import { Schema, model } from 'mongoose';

const internshipSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    visa_sponsorship: { type: Boolean, default: false },
    remote: { type: Boolean, default: false },
    location: { type: String },
    skills: [{ type: String }],
    duration: { type: String },
    language: { type: String },
});

export default model('Internship', internshipSchema);

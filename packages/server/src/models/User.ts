import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profile: {
        education: [{
            institution: { type: String },
            degree: { type: String },
            field_of_study: { type: String },
            start_date: { type: Date },
            end_date: { type: Date },
        }],
        skills: [{ type: String }],
        interests: [{ type: String }],
        preferences: {
            languages: [{ type: String }],
            relocation_openness: { type: Boolean },
            preferred_regions: [{ type: String }],
        },
    },
});

export default model('User', userSchema);

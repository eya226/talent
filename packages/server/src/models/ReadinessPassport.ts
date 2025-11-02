import { Schema, model } from 'mongoose';

const readinessPassportSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    readiness_score: { type: Number, default: 0 },
    eligibility: [{
        country: { type: String },
        score: { type: Number },
    }],
    suggested_actions: [{ type: String }],
});

export default model('ReadinessPassport', readinessPassportSchema);

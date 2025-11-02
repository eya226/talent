import { Schema, model } from 'mongoose';

const applicationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    internship: { type: Schema.Types.ObjectId, ref: 'Internship', required: true },
    status: { type: String, enum: ['submitted', 'viewed', 'responded', 'interview', 'rejected', 'offer'], default: 'submitted' },
    submitted_at: { type: Date, default: Date.now },
    communications: [{
        message: { type: String },
        received_at: { type: Date, default: Date.now },
    }],
});

export default model('Application', applicationSchema);

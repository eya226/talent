import { Schema, model } from 'mongoose';

const interviewSimulationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scenario_type: { type: String, enum: ['live_coding', 'system_design', 'technical_quiz', 'hr_behavioral', 'group_collaborative', 'international_culture_fit'], required: true },
    scenario_details: { type: String },
    feedback: { type: String },
    readiness_score: { type: Number, default: 0 },
});

export default model('InterviewSimulation', interviewSimulationSchema);

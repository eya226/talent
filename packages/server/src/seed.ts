import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Internship from './models/Internship';
import User from './models/User';
import ReadinessPassport from './models/ReadinessPassport';
import InterviewSimulation from './models/InterviewSimulation';

dotenv.config();

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in your .env file');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const seedDB = async () => {
    await Internship.deleteMany({});
    await User.deleteMany({});
    await ReadinessPassport.deleteMany({});
    await InterviewSimulation.deleteMany({});

    const internships = [
        { title: 'Software Engineer Intern', company: 'Google', description: 'Work on cool stuff.', visa_sponsorship: true, remote: false, location: 'Mountain View, CA', skills: ['JavaScript', 'Python'], duration: '12 weeks', language: 'English' },
        { title: 'Data Science Intern', company: 'Facebook', description: 'Analyze user data.', visa_sponsorship: false, remote: true, location: 'Remote', skills: ['Python', 'R', 'SQL'], duration: '12 weeks', language: 'English' },
    ];
    await Internship.insertMany(internships);

    const users = [
        { uid: 'testuser1', email: 'testuser1@example.com' },
        { uid: 'testuser2', email: 'testuser2@example.com' },
    ];
    const createdUsers = await User.insertMany(users);

    const passports = [
        { user: createdUsers[0]._id, readiness_score: 85, eligibility: [{ country: 'USA', score: 90 }, { country: 'Canada', score: 80 }], suggested_actions: ['Improve your system design skills.'] },
        { user: createdUsers[1]._id, readiness_score: 75, eligibility: [{ country: 'USA', score: 80 }, { country: 'UK', score: 70 }], suggested_actions: ['Practice your live coding skills.'] },
    ];
    await ReadinessPassport.insertMany(passports);

    const simulations = [
        { user: createdUsers[0]._id, scenario_type: 'live_coding', scenario_details: 'FizzBuzz', feedback: 'Good job!', readiness_score: 90 },
        { user: createdUsers[1]._id, scenario_type: 'system_design', scenario_details: 'Design a URL shortener.', feedback: 'Could be better.', readiness_score: 70 },
    ];
    await InterviewSimulation.insertMany(simulations);
};

seedDB().then(() => {
    mongoose.connection.close();
});

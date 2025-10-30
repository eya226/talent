import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quest from './models/Quest';
import Job from './models/Job';

dotenv.config();

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in your .env file');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const quests = [
    { title: 'Find the Missing Semicolon', description: 'A critical semicolon has gone missing. Find it and restore the code to its former glory.', xp: 10 },
    { title: 'The Case of the Infinite Loop', description: 'A developer has created an infinite loop. Find the bug and break the cycle.', xp: 20 },
    { title: 'The Null Pointer Nightmare', description: 'A null pointer is causing chaos. Track it down and eliminate it.', xp: 30 },
    { title: 'The SQL Injection Specter', description: 'A malicious actor is attempting to steal data using SQL injection. Secure the database and prevent the attack.', xp: 50 },
    { title: 'The Cross-Site Scripting Serpent', description: 'A sneaky serpent is injecting malicious scripts into the website. Sanitize the inputs and protect the users.', xp: 75 },
];

const seedDB = async () => {
    await Quest.deleteMany({});
    const createdQuests = await Quest.insertMany(quests);

    const jobs = [
        { title: 'Frontend Developer Intern', company: 'Google', requiredXp: 50, requiredQuests: [createdQuests[0]._id, createdQuests[1]._id] },
        { title: 'Backend Developer Intern', company: 'Facebook', requiredXp: 100, requiredQuests: [createdQuests[2]._id, createdQuests[3]._id] },
        { title: 'Full Stack Developer Intern', company: 'Amazon', requiredXp: 150, requiredQuests: [createdQuests[0]._id, createdQuests[1]._id, createdQuests[2]._id, createdQuests[3]._id] },
        { title: 'Security Engineer Intern', company: 'Microsoft', requiredXp: 200, requiredQuests: [createdQuests[3]._id, createdQuests[4]._id] },
    ];

    await Job.deleteMany({});
    await Job.insertMany(jobs);
};

seedDB().then(() => {
    mongoose.connection.close();
});

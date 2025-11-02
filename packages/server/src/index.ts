import express, { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import User from './models/User';
import internshipRoutes from './routes/internshipRoutes';
import aiMentorRoutes from './routes/aiMentorRoutes';
import scrapingRoutes from './routes/scrapingRoutes';
import documentGenerationRoutes from './routes/documentGenerationRoutes';
import applicationRoutes from './routes/applicationRoutes';
import resourceRoutes from './routes/resourceRoutes';
import interviewSimulatorRoutes from './routes/interviewSimulatorRoutes';

dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
}


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { session } = req.cookies;
    if (!session) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const decodedClaims = await admin.auth().verifySessionCookie(session, true);
        (req as any).user = decodedClaims;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
};

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const newUser = new User({
        uid: userRecord.uid,
        email,
    });
    await newUser.save();

    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
});

app.post('/login', async (req: Request, res: Response) => {
    const { idToken } = req.body;
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    try {
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success' }));
    } catch (error) {
        res.status(401).send('UNAUTHORIZED REQUEST!');
    }
});

app.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('session');
    res.redirect('/');
});

app.use('/internships', authMiddleware, internshipRoutes);
app.use('/ai-mentor', authMiddleware, aiMentorRoutes);
app.use('/scrape', authMiddleware, scrapingRoutes);
app.use('/generate-documents', authMiddleware, documentGenerationRoutes);
app.use('/applications', authMiddleware, applicationRoutes);
app.use('/resources', authMiddleware, resourceRoutes);
app.use('/interview-simulator', authMiddleware, interviewSimulatorRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

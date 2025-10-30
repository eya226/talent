import express, { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Load User and Quest models
import User from './models/User';
import Quest from './models/Quest';
import Job from './models/Job';

dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

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
        xp: 0,
        completedQuests: [],
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


app.post('/chat', (req: Request, res: Response) => {
  const { message } = req.body;
  const userMessage = message.text.toLowerCase();
  let responseText;

  if (userMessage.includes('hello') || userMessage.includes('hi')) {
    responseText = 'Hello! My name is Aria. What is your name?';
  } else if (userMessage.includes('name is')) {
    responseText = `Nice to meet you! What are your career goals?`;
  } else if (userMessage.includes('developer') || userMessage.includes('engineer') || userMessage.includes('coder')) {
    responseText = `That's a great goal! I can help you with that. Let's start by playing a game to assess your skills.`;
  } else {
    responseText = "I'm not sure how to respond to that. Could you tell me about your career goals?";
  }

  const responseMessage = {
    _id: new Date().getTime(),
    text: responseText,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Aria',
    },
  };
  res.status(200).send(responseMessage);
});

app.get('/users', authMiddleware, async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).send(users);
});

app.get('/user', authMiddleware, async (req: Request, res: Response) => {
    const user = await User.findOne({ uid: (req as any).user.uid });
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
});

app.get('/quests', authMiddleware, async (req: Request, res: Response) => {
    const quests = await Quest.find();
    res.status(200).send(quests);
});

app.post('/quests/complete', authMiddleware, async (req: Request, res: Response) => {
  const { questId } = req.body;
  const user = await User.findOne({ uid: (req as any).user.uid });
  const quest = await Quest.findById(questId);

  if (!user || !quest) {
    return res.status(404).send({ error: 'User or quest not found' });
  }

  if (user.completedQuests.includes(questId)) {
    return res.status(400).send({ error: 'Quest already completed' });
  }

  user.xp += quest.xp;
  user.completedQuests.push(questId);
  await user.save();

  res.status(200).send(user);
});

app.get('/jobs', authMiddleware, async (req: Request, res: Response) => {
    const jobs = await Job.find();
    res.status(200).send(jobs);
});

app.get('/jobs/match', authMiddleware, async (req: Request, res: Response) => {
    const user = await User.findOne({ uid: (req as any).user.uid }).populate('completedQuests');

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    const allJobs = await Job.find();
    const matchedJobs = allJobs.filter(job => {
        const hasEnoughXp = user.xp >= job.requiredXp;
        const hasCompletedRequiredQuests = job.requiredQuests.every(requiredQuest =>
            user.completedQuests.some(completedQuest => completedQuest.equals(requiredQuest))
        );
        return hasEnoughXp && hasCompletedRequiredQuests;
    });

    res.status(200).send(matchedJobs);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

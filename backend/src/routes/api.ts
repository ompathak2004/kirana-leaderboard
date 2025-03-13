import express from 'express';
import Queue from 'bull';
import { getLeaderboard } from '../services/leaderboardService';

const router = express.Router();
const imageQueue = new Queue('imageQueue', { redis: { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) } });

router.post('/upload', async (req, res) => {
  const { userId, imageUrl } = req.body as { userId: string; imageUrl: string };
  await imageQueue.add({ userId, imageUrl });
  res.status(202).json({ message: 'Image queued for processing' });
});

//can be used by anothar service to get the leaderboard from redis
//currently no used
router.get('/leaderboard', async (_req, res) => {
  const leaderboard = await getLeaderboard();
  res.json(leaderboard);
});

export { router, imageQueue };
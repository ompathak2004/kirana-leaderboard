import { redisClient } from '../config/redis';
import { db } from '../config/firebase';
import admin from 'firebase-admin';

const LEADERBOARD_KEY = 'kirana:leaderboard';

// Interface for leaderboard entries
interface LeaderboardEntry {
  userId: string;
  score: number;
}

export const updateLeaderboard = async (userId: string, score: number): Promise<void> => {
  // Increment score in Redis sorted set
  await redisClient.zIncrBy(LEADERBOARD_KEY, score, userId);

  // Update Firestore for real-time sync with frontend
  await db.collection('leaderboard').doc(userId).set(
    {
      userId,
      score: admin.firestore.FieldValue.increment(score),
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
};

export const getLeaderboard = async (limit: number = 10): Promise<LeaderboardEntry[]> => {
  const result = await redisClient.zRevRange(LEADERBOARD_KEY, 0, limit - 1, 'WITHSCORES');

  const leaderboard: LeaderboardEntry[] = [];
  for (let i = 0; i < result.length; i += 2) {
    leaderboard.push({
      userId: result[i],
      score: parseFloat(result[i + 1]),
    });
  }

  return leaderboard;
};
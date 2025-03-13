import { imageQueue } from './routes/api';
import { processImage } from './services/imageService';
import { updateLeaderboard } from './services/leaderboardService';
import { upsertUser } from './models/User';
import { db } from './config/firebase';


imageQueue.process(async (job) => {
    const { userId, imageUrl, imageId } = job.data;
    
    try {
      await db.collection('images').doc(imageId).update({
        status: 'processing'
      });
  
      const { packetCount, score } = await processImage(imageUrl);
  
      await db.runTransaction(async (transaction) => {
        transaction.update(db.collection('images').doc(imageId), {
          packetCount,
          score,
          status: 'completed',
          processedAt: new Date().toISOString()
        });
        
        await Promise.all([
          upsertUser({ userId, name: 'User', totalScore: score }),
          updateLeaderboard(userId, score)
        ]);
      });
  
    } catch (error) {
      console.error(`Processing failed for imageId: ${imageId}`, error);
      
      await db.collection('images').doc(imageId).update({
        status: 'failed',
        error: (error as Error).message,
        failedAt: new Date().toISOString()
      });
  
      throw error;
    }
  });
  
  imageQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
  });
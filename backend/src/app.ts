import express from 'express';
import { createUserTable } from './models/User';
import { redisClient } from './config/redis';
import { router } from './routes/api';

const app = express();

app.use(express.json());
app.use('/api/v1', router);

const startServer = async () => {
  await createUserTable();
  await redisClient.connect();
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
};

startServer();
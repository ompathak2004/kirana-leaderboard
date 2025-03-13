import { createClient } from 'redis';

export const redisClient = createClient({
  socket: { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) },
});

redisClient.on('connect', () => console.log('Redis connected'));
import { createClient } from 'redis';
import { REDIS_URL } from './env.ts';

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export default redisClient;

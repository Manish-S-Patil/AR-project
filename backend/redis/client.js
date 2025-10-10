import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

export const redis = createClient({ url: redisUrl })

redis.on('error', (err) => {
  console.error('❌ Redis Client Error:', err)
})

export async function ensureRedisConnection() {
  if (!redis.isOpen) {
    await redis.connect()
  }
  return redis
}

export default redis



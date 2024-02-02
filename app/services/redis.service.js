const redis = require("redis");
const { logger } = require("../config/winston");
require("dotenv").config();

const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`;

let Redis = {};
Redis.getCache = async (key) => {
  const client = await connectRedis();
  const resp = await client.get(key);
  if (resp) return { Message: "Cache Present for RestaurantID :" + key, Status: true, response: JSON.parse(resp) };
  else return { Message: "Cache not Present for RestaurantID :" + key, Status: false };
};
Redis.setCache = async (key, data) => {
  const client = await connectRedis();
  const saveResult = await client.set(key, JSON.stringify(data));
  logger.info("New Data Cached for RestaurantID :" + key);
  return saveResult;
};
Redis.delCache = async (key) => {
  const client = await connectRedis();
  const resp = await client.del(key);
};

async function connectRedis() {
  const client = redis.createClient({ url });

  client.on("ready", () => logger.info("Redis Client Ready"));
  client.on("error", (err) => logger.error("Redis Client Error" + err));
  await client.connect();
  return client;
}

module.exports = Redis;

const { Module } = require('module')
const redis = require('redis')
const logger = require("../config/winston")
require("dotenv").config()

const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`

const responseTime = require('response-time')
const { promisify } = require('util')


async function connectRedis() {
    const client = redis.createClient({url});
    
      client.on('ready', () => logger.info('Redis Client Ready',));
      client.on('error', (err) => logger.error('Redis Client Error'+err));

      await client.connect();
      return client;
}

async function setCache(key, data) {  
    const client = await connectRedis()
    const saveResult = await client.set(key, JSON.stringify(data))
    logger.info('New Data Cached for key'+key)
    return (saveResult)
}

async function getCache(key) {       
    const client = await connectRedis()
    const resp = await client.get(key)
    if(resp)
    {
        logger.info("Cache is already present"+resp)
        return true;
    }
    else
        return false;   
}

async function delCache(key) {
    const client = await connectRedis()
    const resp = await client.del(key)
   
}

module.exports = (
    connectRedis,
    setCache,
    getCache,
    delCache
)
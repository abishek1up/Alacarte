const restaurantService = require("../services/restaurant.service")
const restaurant = require("../models/restaurant")

const axios = require('axios')
const redis = require('redis')

require("dotenv").config()

const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`

//const url = process.env.REDIS_HOST;

const responseTime = require('response-time')
const { promisify } = require('util')

/* const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
})
 */
/* let client;

client = redis.createClient(6379, '127.0.0.1');

  client.connect();
*/

async function connectRedis() {
    const client = redis.createClient({
        url
        //host: process.env.REDIS_HOST,
      
        //password: process.env.REDIS_PASSWORD,
       
        //database: 'restdb'
      });
    
      client.on('ready', () => console.log('Redis Client Ready',));
      client.on('error', (err) => console.log('Redis Client Error', err));
    
     // GET_ASYNC = promisify(client.get).bind(client)
      //SET_ASYNC = promisify(client.set).bind(client) 

      await client.connect();
      return client;
}

async function setCache(key, data) {  
    const client = await connectRedis()
    //const SET_ASYNC = promisify(client.set).bind(client) 
    const saveResult = await client.set(key, JSON.stringify(data))
    console.log('New Data Cached for key',key)
    return (saveResult)
}

async function getCache(key) {       
    const client = await connectRedis()
    //const GET_ASYNC = promisify(client.get).bind(client)
    const resp = await client.get(key)
    if(resp)
    {
        console.log("Cache is already present", resp)
        return true;
    }
    else
        return false;   
}

async function delCache(key) {
    const client = await connectRedis()
    const resp = await client.del(key)
   
}

//const isAuthenticated = require(".../isAuthenticated");

module.exports = {
    getRestaurants: async (req, res) => {
        const restaurants = await restaurantService.getRestaurants()
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(restaurants)
    },
    getRestaurant: async (req, res) => {
        const restaurants = await restaurantService.getRestaurant(req.params.id)
        if (restaurants.statusCode == 200 && (res.statusCode >= 200 && res.statusCode < 400)) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(restaurants)
        }
        else {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.json(restaurants)
        }
    },
    createRestaurant: async (req, res) => {
        try {
            const restaurants = await restaurantService.createRestaurant(req.body)
            if (restaurants.statusCode != 400) {
                res.status(201).json(restaurants);
            }
            else {
                res.status(400).json(restaurants);
            }
        }
        catch (e) {
            if (!e.status) {
                res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
            } else {
                res.status(e.status).json({ error: { code: e.code, message: e.message } });
            }
        }
    },
    deleteRestaurant: async (req, res) => {
        const check = await restaurantService.deleteRestaurant(req.params.id)
        if (check.acknowledged) {
            const restaurants = await restaurantService.getRestaurants()
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(restaurants)
        }
        else {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.json(check)
        }
    },
    updateRestaurant: async (req, res) => {
        try {
            const restaurants = await restaurantService.updateRestaurant(req.params.id, req.body)
            if (restaurants.statusCode != 400) {
                res.status(201).json(restaurants);
            }
            else {
                res.status(400).json(restaurants);
            }
        }
        catch (e) {
            if (!e.status) {
                res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
            } else {
                res.status(e.status).json({ error: { code: e.code, message: e.message } });
            }
        }
    },
    searchViaDistance: async (req, res) => {
        const restaurants = await restaurantService.searchViaDistance(req.params.id)
        if (restaurants.statusCode == 200 && (res.statusCode >= 200 && res.statusCode < 400)) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(restaurants)
        }
        else {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.json(restaurants)
        }
    },
    searchViaCoordinates: async (req, res) => {
        const restaurants = await restaurantService.searchViaCoordinates(req.params.id)
        if (restaurants.statusCode == 200 && (res.statusCode >= 200 && res.statusCode < 400)) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(restaurants)
        }
        else {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.json(restaurants)
        }
    },
    cacheDB: async (req, res) => {
        try {
            const restaurants = await restaurantService.cacheDB();
        
            const result = await getCache("Test3");
            if(!result)
            {
                console.log('Not Cached')
                const saveResult = await setCache("Test3", restaurants)
                console.log('Cached Value', saveResult)
            }         
            
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')     
            res.json(restaurants);

            
        } catch (error) {
            res.json(error.message)
        }
    }

}
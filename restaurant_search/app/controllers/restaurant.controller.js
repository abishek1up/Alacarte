const restaurantService = require("../services/restaurant.service")
const restaurant = require("../models/restaurant")
var test = require('mongoose');
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
    getALLRestaurants: async (req, res) => {
        const restaurants = await restaurantService.getALLRestaurants()
        if(restaurants.StatusCode == null)
        return res.status(200).json(restaurants);
        else
        res.status(restaurants.StatusCode).json(restaurants);
    },
    getRestaurantByID: async (req, res) => {
        const restaurants = await restaurantService.getRestaurantByID(req.params.restaurant_id)
        if(restaurants.StatusCode == null)
        return res.status(200).json(restaurants);
        else
        res.status(restaurants.StatusCode).json(restaurants);
    },
    createRestaurant: async (req, res) => {
        var restaurants = await restaurantService.createRestaurant(req.body);
        if(restaurants.StatusCode == 201)
        return res.status(201).json(restaurants);
        else
        res.status(restaurants.StatusCode).json(restaurants);
    },
    deleteRestaurantByID: async (req, res) => {
        const check = await restaurantService.deleteRestaurantByID(req.params.restaurant_id)
        if (check.acknowledged) {
            return res.status(200).json(check);
        }
        else {
            return res.status(check.StatusCode).json(check);
        }
    },
    updateRestaurantDetailsByID: async (req, res) => {
            const restaurants = await restaurantService.updateRestaurantDetailsByID(req.params.restaurant_id, req.body)
            if (restaurants.StatusCode == null) {
                return res.status(200).json(restaurants);
            }
            else {
                return res.status(restaurants.StatusCode).json(restaurants);
            }
    },  
      
    searchViaKeyword: async (req, res) => {
        const restaurants = await restaurantService.searchViaKeyword(req.params.keyword)
        if(restaurants.StatusCode == null)
        return res.status(200).json(restaurants);
        else
        res.status(restaurants.StatusCode).json(restaurants);
    },
    searchViaBudget: async (req, res) => {
        const restaurants = await restaurantService.searchViaBudget(req.params.budget)
        if(restaurants.StatusCode == null)
        return res.status(200).json(restaurants);
        else
        res.status(restaurants.StatusCode).json(restaurants);
    },
    searchViaDistance: async (req, res) => {
        const restaurants = await restaurantService.searchViaDistance(req.params.id)
        if(restaurants.StatusCode == null)
        return res.status(200).json(restaurants);
        else
        res.status(restaurants.StatusCode).json(restaurants);
    },
    searchViaCoordinates: async (req, res) => {
        const restaurants = await restaurantService.searchViaCoordinates(req.params.id)
        if(restaurants.StatusCode == null)
        return res.status(200).json(restaurants);
        else
        res.status(restaurants.StatusCode).json(restaurants);
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
    },

    getRestaurantMenu: async (req, res) => {
        const menus = await restaurantService.getRestaurantMenu(req.params.restaurant_id)
        if(menus.StatusCode == null)
        return res.status(200).json(menus);
        else
        res.status(menus.StatusCode).json(menus);
    },
    createRestaurantMenu: async (req, res) => {
        const menus = await restaurantService.createRestaurantMenu(req.body,req.params.restaurant_id)
        if(menus.StatusCode == 201)
        return res.status(201).json(menus);
        else
        res.status(menus.StatusCode).json(menus);
    },
    updateRestaurantMenu: async (req, res,) => {
        const menus = await restaurantService.updateRestaurantMenu(req.params.restaurant_id,req.params.menu_id,req.body)
        if (menus.StatusCode == null) {
            return res.status(200).json(menus);
        }
        else {
            return res.status(menus.StatusCode).json(menus);
        }
    },
    deleteRestaurantMenu: async (req, res) => {
        const check = await restaurantService.deleteRestaurantMenu(req.params.restaurant_id,req.params.menu_id)
        if (check.acknowledged) {
            return res.status(200).json(check);
        }
        else {
            return res.status(check.StatusCode).json(check);
        }
    },

}
const restaurantService = require("../services/restaurant.service")
const redis = require('../services/redis.service')
const { keyword, budget, restaurantCreateSchema, restaurantId, menuCreateSchema, menuId } = require("../models/validation")
const logger = require("../config/winston")

const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`

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



module.exports = {
    getALLRestaurants: async (req, res) => {
        logger.info('Get All Orders of Restaurants');

         //Service Layer Call
        const restaurants = await restaurantService.getALLRestaurants()
        if (restaurants.StatusCode == null) {
            logger.info('Fetch all Restaurants Complete');
            return res.status(200).json(restaurants);
        }
        else
            res.status(restaurants.StatusCode).json(restaurants);
    },
    getRestaurantByID: async (req, res) => {
        try {
            logger.info('Get Restaurant by Restaurant ID-' + req.params.restaurantId);

            //Joi Validation
            await restaurantId.validateAsync(req.params.restaurantId).then().catch(function (error) {
                let err = new Error("restaurantId :" + error.message); err.status = 422; throw err;
            })

            //Service Layer Call
            const restaurants = await restaurantService.getRestaurantByID(req.params.restaurantId)
            if (restaurants.StatusCode == null)
                return res.status(200).json(restaurants);
            else
                res.status(restaurants.StatusCode).json(restaurants);
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    createRestaurant: async (req, res) => {
        try {
            logger.info('Create new Restaurant');

            //Joi Validation
            await restaurantCreateSchema.validateAsync(req.body).then().catch(function (error) {
                let err = new Error(error.message); err.status = 422; throw err;
            })

             //Service Layer Call
            var restaurants = await restaurantService.createRestaurant(req.body);
            if (restaurants.StatusCode == 201)
                return res.status(201).json(restaurants);
            else
                res.status(restaurants.StatusCode).json(restaurants);
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    deleteRestaurantByID: async (req, res) => {
        try {
            logger.info('Delete Restaurant by Restaurant ID-' + req.params.restaurantId);

            //Joi Validation
            await restaurantId.validateAsync(req.params.restaurantId).then().catch(function (error) {
                let err = new Error("restaurantId :" + error.message); err.status = 422; throw err;
            })

             //Service Layer Call
            const check = await restaurantService.deleteRestaurantByID(req.params.restaurantId)
            if (check.acknowledged) {
                return res.status(200).json(check);
            }
            else {
                return res.status(check.StatusCode).json(check);
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    updateRestaurantDetailsByID: async (req, res) => {
        try {
            logger.info('Update Restaurant Details by Restaurant ID-' + req.params.restaurantId);

            //Joi Validation
            await restaurantId.validateAsync(req.params.restaurantId).then().catch(function (error) {
                let err = new Error("restaurantId :" + error.message); err.status = 422; throw err;
            })
            await restaurantCreateSchema.validateAsync(req.body).then().catch(function (error) {
                let err = new Error(error.message); err.status = 422; throw err;
            })

             //Service Layer Call
            const restaurants = await restaurantService.updateRestaurantDetailsByID(req.params.restaurantId, req.body)
            if (restaurants.StatusCode == null) {
                return res.status(200).json(restaurants);
            }
            else {
                return res.status(restaurants.StatusCode).json(restaurants);
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },

    searchViaKeyword: async (req, res) => {
        try {
            logger.info('Search Restaurant by Keyword -' + req.params.keyword);

            //Joi Validation
            await keyword.validateAsync(req.params.keyword).then().catch(function (error) {
                let err = new Error("Keyword :" + error.message); err.status = 422; throw err;
            })

             //Service Layer Call
            const restaurants = await restaurantService.searchViaKeyword(req.params.keyword)
            if (restaurants.StatusCode == null)
                return res.status(200).json(restaurants);
            else
                res.status(restaurants.StatusCode).json(restaurants);
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    searchViaBudget: async (req, res) => {
        try {
            logger.info('Search Restaurant by budget -' + req.params.budget);

            //Joi Validation
            await budget.validateAsync(req.params.budget).then().catch(function (error) {
                let err = new Error("budget :" + error.message); err.status = 422; throw err;
            })

             //Service Layer Call
            const restaurants = await restaurantService.searchViaBudget(req.params.budget)
            if (restaurants.StatusCode == null)
                return res.status(200).json(restaurants);
            else
                res.status(restaurants.StatusCode).json(restaurants);
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },

     //COMPLETE CACHE
    completeCache: async (req, res) => {
        try {
            logger.info('Cache Restaurant by restaurantId -' + req.params.restaurantId);

            //Joi Validation
            await restaurantId.validateAsync(req.params.restaurantId).then().catch(function (error) {
                let err = new Error("restaurantId :" + error.message); err.status = 422; throw err;
            })

            //Service Layer Call
            const restaurants = await restaurantService.completeCache(req.params.restaurantId);

            const result = getCache(req.params.restaurantId);
            if (!result) {
                console.log('Restuarant Id-' + req.params.restaurantId + ' is Not Cached')
                const saveResult = setCache(req.params.restaurantId, restaurants)
                console.log('Cached Value', saveResult)
            }

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(restaurants);

        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },

    getRestaurantMenu: async (req, res) => {
        try {
            logger.info('Get Menu for Restaurant of Restaurant ID-' + req.params.restaurantId);

            //Joi Validation
            await restaurantId.validateAsync(req.params.restaurantId).then().catch(function (error) {
                let err = new Error("restaurantId :" + error.message); err.status = 422; throw err;
            })

            //Service Layer Call
            const menus = await restaurantService.getRestaurantMenu(req.params.restaurantId)
            if (menus.StatusCode == null)
                return res.status(200).json(menus);
            else
                res.status(menus.StatusCode).json(menus);
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    createRestaurantMenu: async (req, res) => {
        try {
            logger.info('Create Menu for Restaurant of Restaurant ID-' + req.params.restaurantId);

            //Joi Validation
            await restaurantId.validateAsync(req.params.restaurantId).then().catch(function (error) {
                let err = new Error("restaurantId :" + error.message); err.status = 422; throw err;
            })
            await menuCreateSchema.validateAsync(req.body).then().catch(function (error) {
                let err = new Error(error.message); err.status = 422; throw err;
            })

            //Service Layer Call
            const menus = await restaurantService.createRestaurantMenu(req.body, req.params.restaurantId)
            if (menus.StatusCode == 201)
                return res.status(201).json(menus);
            else
                res.status(menus.StatusCode).json(menus);
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    updateRestaurantMenu: async (req, res,) => {
        try {
            logger.info('Get Menu for Restaurant of Restaurant ID-' + req.params.restaurantId);

            //Joi Validation
            await restaurantId.validateAsync(req.params.restaurantId).then().catch(function (error) {
                let err = new Error("restaurantId :" + error.message); err.status = 422; throw err;
            })
            await menuId.validateAsync(req.params.menuId).then().catch(function (error) {
                let err = new Error("menuId :" + error.message); err.status = 422; throw err;
            })

            await menuCreateSchema.validateAsync(req.body).then().catch(function (error) {
                let err = new Error(error.message); err.status = 422; throw err;
            })

            //Service Layer Call
            const menus = await restaurantService.updateRestaurantMenu(req.params.restaurantId, req.params.menuId, req.body)
            if (menus.StatusCode == null) {
                return res.status(200).json(menus);
            }
            else {
                return res.status(menus.StatusCode).json(menus);
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    deleteRestaurantMenu: async (req, res) => {
        try {
            logger.info('Get Menu for Restaurant of Restaurant ID-' + req.params.restaurantId);

            //Joi Validation
            await restaurantId.validateAsync(req.params.restaurantId).then().catch(function (error) {
                let err = new Error("restaurantId :" + error.message); err.status = 422; throw err;
            })
            await menuId.validateAsync(req.params.menuId).then().catch(function (error) {
                let err = new Error("menuId :" + error.message); err.status = 422; throw err;
            })


            //Service Layer Call
            const check = await restaurantService.deleteRestaurantMenu(req.params.restaurantId, req.params.menuId)
            if (check.acknowledged) {
                return res.status(200).json(check);
            }
            else {
                return res.status(check.StatusCode).json(check);
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },

}
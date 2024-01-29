dotenv - to provide configuration for prod, dev, testing environment
nodemon - restart server.js whenever the files are change
mongoose - mongodb orm

services - to have business logic (BL), database interactions
routes - to have routes/path to controller
controllers - to have logic specific to request/response (http),
              use services for BL


.env file content

```
IP_ADDRESS=0.0.0.0
PORT=8080
MONGO_SERVER=
MONGO_DATABASE=
MONGO_USERNAME=
MONGO_PASSWORD=

```

## Points to take care

```

1. POST/PUT - creation/updation purpose - validate input parameters
                    Joi / express validator  [npm install joi]
                    must be done at controller level

1.1 With controllers, use proper error handling 
    1. if the restaurent_id not found, it should return 404 error 
    2. if the restaurent_id present, 200 ok with json 
    3. if any server error, return 5xx  [middleware, differ for a while]
    4. if the parameter from client is not valid one, [400 bad request]

2. Models 
        Restaurent model 
            explore yourself
        Menu model 
            _id - default in mongo db
            name/title 
            price
            category : veg/non-veg 
            cusion: north/south
            restaurent_id

        either can be separate collection or sub documents
        Mongoose relations populate func



3. Swagger for testing purpose

4. For Microservices, the code base should be indepenent
    each project should be indepenently modified, distributed, deployed

projects
    restaurents 
        package.json
        app 
            ...

    order
        package.json
        app 
            ....
    
    reviews
        package.json 
        app
            ....
```

```
Reviews
    reviews
    ratings 
        calculation 

    need restarent_id [post method]
    
    Inter process communication 
        Micro Service to Micro Services

        REST API call to restuarent service from review service 
            check restuarent exist or not

        RabbitMQ

```
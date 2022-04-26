module.exports = {
    apps : [{
      name   : "restaurant-service",
      script : "./server.js",
      instances : "max",
      exec_mode : "cluster",
      args   : "limit"
    },{
      name   : "susbcribe-review",
      script : "./app/middleware/consumer.middleware.js",
      args   : "rotate"
    }]
  }
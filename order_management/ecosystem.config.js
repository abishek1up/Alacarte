module.exports = {
    apps : [{
      name   : "order-service",
      script : "./server.js",
      instances : "max",
      exec_mode : "cluster",
      args   : "limit"
    }]
  }
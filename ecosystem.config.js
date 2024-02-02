module.exports = {
    apps : [{
      name   : "customer-service",
      script : "./server.js",
      instances : "max",
      exec_mode : "cluster",
      args   : "limit"
    }]
  }
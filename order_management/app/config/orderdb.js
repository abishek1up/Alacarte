
const { Module } = require("module");
const Sequelize = require('sequelize')
const Pool = require("pg").Pool

const pool = new Pool({
    user : "postgres",
    password : "tmp",
    database : "TestDB",
    host: "localhost",
    port: 5432
})  

// module.exports = pool

 module.exports = async function connectMongo() {  

    const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect:process.env.PG_DIALECT,
    operatorsAliases: false,
  });
 
    return await sequelize.authenticate ();

}
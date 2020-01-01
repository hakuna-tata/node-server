const Sequelize = require("sequelize")
const {
    dbName,
    user,
    password,
    host,
    port
} = require('../config').database

const sequelize = new Sequelize(dbName,user,password,{
    host,
    port,
    dialect:'mysql',
    logging:true,
    timezone:'+08:00'
})

module.exports = {
    db:sequelize
}
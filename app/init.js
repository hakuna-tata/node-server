const fs = require("fs")
const path = require("path")
const Router = require("koa-router")
const mongoose = require("mongoose")
const {dbUrl, dbName} = require("./config")

class InitManager{
    static initCore(app){
        InitManager.initMongoDB()
        InitManager.initRoutes(app)
    }

    static initMongoDB(){
        mongoose.connect(dbUrl + '/' + dbName, { useNewUrlParser: true,  useUnifiedTopology: true }, () => console.log('[MongoDB] starting at port 270127'))
        mongoose.connection.on('error', console.error)
    }

    static initRoutes(app){
        fs.readdirSync(path.resolve(__dirname,'./routes/v1')).forEach(file => {
            const router = require(`./routes/v1/${file}`)
            if(router instanceof Router){
                app.use(router.routes())
            }
        })
        
    }
}

module.exports = InitManager
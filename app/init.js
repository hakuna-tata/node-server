const fs = require("fs")
const path = require("path")
const Router = require("koa-router")

class InitManager{
    static initCore(app){
        InitManager.initRoutes(app)
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
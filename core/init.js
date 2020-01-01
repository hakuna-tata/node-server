const Router = require('koa-router')
const requireDirectory = require("require-directory")

class InitManager{
    static initCore(app){
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.initLoadConfig()
    }

    // 初始化路由
    static initLoadRouters(){
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module,apiDirectory,{ visit: whenLoadModule })

        function whenLoadModule(obj){
            if(obj instanceof Router){
                InitManager.app.use(obj.routes())
            }
        }
    }

     // 加载全局配置
     static initLoadConfig(){
        const path = `${process.cwd()}/config/index`
        global.config = require(path)
    }
}

module.exports = InitManager
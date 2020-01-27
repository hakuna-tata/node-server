const Koa = require("koa")
const parser = require("koa-bodyparser")
const InitManager = require("./app/init")
const app = new Koa()

app.use(parser())
InitManager.initCore(app)

app.listen(3000, () => console.log("程序启动在 3000 端口了"))
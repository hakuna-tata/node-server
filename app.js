const Koa = require("koa")
const parser = require("koa-bodyparser")
const catchError = require("./app/middlewares/exception")
const InitManager = require("./app/init")
const app = new Koa()

app.use(catchError)
app.use(parser())
InitManager.initCore(app)

app.listen(3000, () => console.log('[Server] starting at port 3000'))
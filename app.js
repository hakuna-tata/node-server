const Koa = require("koa")
const classic = require("./app/api/v1/classic")
const book = require("./app/api/v1/book")

const app =  new Koa()

app.use(classic.routes())
app.use(book.routes())
// app.use(async(ctx,next) => {
//     if(ctx.path === '/name' && ctx.method === 'GET'){
        
//     }
// })
app.listen(3008)
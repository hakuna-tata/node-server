const Router = require('koa-router')

const router = new Router()

router.get('/v1/classic/latest',(ctx, next) => {
    ctx.body = {
        key:'classic'
    }
})

router.post('/v1/:id/classic/latest',(ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.headers
    const body = ctx.request.body
    ctx.body = {
        key:'classic'
    }
    throw new Error("API Exception")
})

module.exports = router
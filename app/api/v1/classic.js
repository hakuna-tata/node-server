const Router = require('koa-router')
const { HttpException, ParameterException } = require('../../../core/httpException')

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

    if(true){
        const error = new ParameterException()
        throw error
    }

    ctx.body = {
        key:'classic'
    }
})

module.exports = router
const { HttpException } = require('../core/httpException')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const isDev = global.config.env === 'development'
        const isHttpException = error instanceof HttpException
        if(isDev && !isHttpException){
            throw error
        }
        if(isHttpException){
            ctx.body = {
                msg:error.msg,
                error_code:error.errorCode,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }else{
            ctx.body = {
                msg:"we made a mistake",
                error_code:999,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError
const { HttpException } = require('../utils/httpException')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if(error instanceof HttpException){
            ctx.body = {
                message:error.message,
                code:error.code,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = error.status
        }else{
            ctx.body = {
                message: "we make a mistake",
                code: -1,
                request: `${ctx.method} ${ctx.path}`
              }
            ctx.status = 500
        }
    }
}

module.exports = catchError
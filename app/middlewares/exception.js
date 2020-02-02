const { HttpException } = require('../utils/httpException')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if(error instanceof HttpException){
            ctx.body = {
                name:error.name,
                message:error.message,
                status:error.status,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = error.status
        }else{
            ctx.body = error
        }
    }
}

module.exports = catchError
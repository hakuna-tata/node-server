const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.body = "服务器有点问题"
    }
}

module.exports = catchError
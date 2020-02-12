class HttpException extends Error{
    constructor(message = "服务器异常", code = -1){
        super()
        Object.assign(this, {
            message, code, status: 500
        })
    }
}

class ParameterException extends HttpException{
    constructor(message){
        super()
        Object.assign(this,{
            message, status: 400
        })
    }
}

class ForbiddenException extends HttpException{
    constructor(message){
        super()
        Object.assign(this,{
            message, status: 403
        })
    }
}

class NotFoundException extends HttpException{
    constructor(message){
        super()
        Object.assign(this,{
            message, status: 404
        })
    }
}

class ConflictException extends HttpException{
    constructor(message){
        super()
        Object.assign(this,{
            message, status: 409
        })
    }
}

const Success = (ctx,status) => {
    ctx.body = {
        message: "OK",
        code: 0
    }
    ctx.status = status
}

module.exports = {
    HttpException,
    ParameterException,
    ForbiddenException,
    NotFoundException,
    ConflictException,
    Success
}
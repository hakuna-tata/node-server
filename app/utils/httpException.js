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

class ConflictException extends HttpException{
    constructor(message){
        super()
        Object.assign(this,{
            message, status: 409
        })
    }
}

class Success extends HttpException {
    constructor(message = "OK", code = 0) {
        super()
        Object.assign(this,{
            message, code, status: 201
        })
    }
}

module.exports = {
    HttpException,
    ParameterException,
    ConflictException,
    Success
}
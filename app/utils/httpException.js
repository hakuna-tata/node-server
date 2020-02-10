class HttpException extends Error{
    constructor(message = "服务器异常", code = -1){
        super()
        Object.assign(this, {
            message, code, status: 500
        })
    }
}

class ParameterException extends HttpException{
    constructor(message, code){
        super()
        this.message = message || "参数错误"
        this.code = -1
        this.status = 400
    }
}

module.exports = {
    HttpException,
    ParameterException
}
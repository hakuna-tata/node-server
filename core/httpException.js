class HttpException extends Error{
    constructor(msg="服务器异常",errorCode=10000,code=400){
        super()
        this.msg = msg
        this.errorCode = errorCode 
        this.code = code
    }
}

class ParameterException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg = msg || "参数错误"
        this.errorCode = errorCode || "10000"
        this.code = 400
    }
}

module.exports = {
    HttpException,
    ParameterException
}
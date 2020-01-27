class HttpException extends Error{
    constructor(msg="服务器异常",errorCode=10000,code=400){
        super()
        this.msg = msg
        this.errorCode = errorCode 
        this.code = code
    }
}

class ParameterException extends HttpException{
    constructor({code = 400, msg = "参数错误", errorCode = "100030"} = {}){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}

module.exports = {
    HttpException,
    ParameterException
}
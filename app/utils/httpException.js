class HttpException extends Error{
    constructor(name, message, status = 500){
        super()
        this.name = name
        this.message = message
        this.status = status
    }
}

module.exports = {
    HttpException
}
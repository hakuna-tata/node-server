const validator = require("validator")

class MyValidator{
  constructor(){

  }

  validate(){
    
  }
}

class Rule{
  constructor(validateFunction, message, ...options){
    Object.assign(this,{
      validateFunction, message, options
    })
    // 如果当前项为optional, 那么没有传入的参数,可以使用默认值
    if(this.validateFunction === "isOptional"){
      this.optional = true
      this.defaultValue = options && options[0]
    }
  }

  validate(context){

  }
}

module.exports = {
  MyValidator,
  Rule
}
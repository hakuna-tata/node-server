const validator = require("validator")
const {
  get,
  last,
  set,
  cloneDeep
} = require("lodash")

class MyValidator{
  constructor(){
    this.data = {}
    this.definedRule = {}
  }

  _getRequestParams(ctx){
    return{
      params:ctx.params,
      query: ctx.request.query,
      body: ctx.request.body,
      header: ctx.request.header
    }
  }

  _getParamValue(key){
    let value
    // 1.没有处理对象键值嵌套对象或者数组等参数类型
    // 2.没有处理可选参数传递默认值
    for(let element in this.data){
      if(this.data[element][key]){
        value = this.data[element][key]
        return value
      }
    }
  }

  _getDefinedRule(originObj){
    for(let key in originObj){
      if(originObj.hasOwnProperty(key) && originObj[key] instanceof Array){
        originObj[key].forEach(value => {
          if(!(value instanceof Rule)) throw new Error("验证数组必须全部为Rule类型")
        })
        Object.assign(this.definedRule,{ [key]:originObj[key] })
      }
    }
  }

  _check(value,rule){

  }
  
  validate(ctx){
    let params = this._getRequestParams(ctx)
    this.data = JSON.parse(JSON.stringify(this._getRequestParams(ctx)))
    this._getDefinedRule.call(this,this)
    for(let key in this.definedRule){
      let value = this._getParamValue(key)
      this._check(value,this.definedRule[key])
    }
  }
}

class Rule{
  constructor(validateFunction, message, ...options){
    Object.assign(this,{
      validateFunction, message, options
    })
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
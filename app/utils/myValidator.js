const validator = require("validator")
const { ParameterException } = require('./httpException')

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
    for(let element in this.data){
      if(this.data[element][key]){
        value = this.data[element][key]
        break
      }
    }
    return value
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

  _checkRules(value,rules,key){
    let ruleResult = {}
    rules.forEach(rule => {
      ruleResult = rule.validate(value,key)
      if(!ruleResult.pass){
        throw new ParameterException(ruleResult.message)
      }
    })
  }
  
  validate(ctx){
    let params = this._getRequestParams(ctx)
    this.data = JSON.parse(JSON.stringify(this._getRequestParams(ctx)))
    this._getDefinedRule.call(this,this)
    for(let key in this.definedRule){
      let value = this._getParamValue(key)
      this._checkRules(value,this.definedRule[key],key)
    }
    return true
  }
}

class RuleResult{
  constructor(pass = false, message, value = null){
    Object.assign(this,{
      pass, message, value
    })
  }
}

class Rule{
  constructor(validateFunction, message, ...options){
    Object.assign(this,{
      validateFunction, message, options
    })
  }

  validate(value,key){
    if(!value){
      // 自定义可选参数
      if(this.validateFunction === "isOptional"){
        let defaultValue = this.options && this.options[0]
        return new RuleResult(true, '', defaultValue)
      }else{
        return new RuleResult(false, `${key}是必传参数`)
      }
    }
    // validator不存在的api
    if(!validator[this.validateFunction]){
      return new RuleResult(false, `${this.validateFunction}api不存在`)
    }
    // 自定义函数
    else if(typeof this.validateFunction === "function"){
      return this.validateFunction(value,...this.options)
    }
    let result = validator[this.validateFunction](value,...this.options)
    return new RuleResult(result, result ? "" : `${key}参数错误`, value)
  }
}

module.exports = {
  MyValidator,
  Rule
}
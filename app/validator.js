const { MyValidator, Rule } = require("./utils/myValidator")

class RegisterValidator extends MyValidator{
  constructor(){
    super()
    this.username= [
      new Rule("isLength", "昵称不符合长度规范", {
        min: 4,
        max: 32
      }),
    ]
    this.email= [
      new Rule("isEmail", "电子邮箱不符合规范,请输入正确的邮箱")
    ]
    this.age = [
      new Rule("isOptional")
    ]
    // this.password1 = [
    //   new Rule(),
    //   new Rule()
    // ]
    // this.password2 = this.password1
  }

  validatePassword(){

  }
}

module.exports = {
  RegisterValidator
}
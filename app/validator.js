const { MyValidator, Rule } = require("./utils/myValidator")

class RegisterValidator extends MyValidator{
  constructor(){
    super()
    this.username= [
      new Rule()
    ]
    this.email= [
      new Rule()
    ]
    this.password1 = [
      new Rule(),
      new Rule()
    ]
    this.password2 = this.password1
  }

  validatePassword(){

  }
}

module.exports = {
  RegisterValidator
}
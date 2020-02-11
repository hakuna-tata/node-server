const userModel = require("../models/user")
const { RegisterValidator } = require("../validator")
const { ConflictException, Success } = require("../utils/httpException")
const dbCollection = "user"

class UserCtl{
  async findAll(ctx){
    const users = await userModel.find(dbCollection,{})
    ctx.body = users
  }

  async register(ctx){
    const v = await new RegisterValidator().validate(ctx)
    const { username } = ctx.request.body
    const repeatedUser = await userModel.find(dbCollection,{ username })
    if(repeatedUser.length){
      throw new ConflictException("用户名已被占用")
    }else{
      await userModel.add(dbCollection,ctx.request.body)
      throw new Success()
    }
  }

  async remove(ctx){
    const username = ctx.params.id
    const result = await userModel.delete(dbCollection,{username})
    ctx.body = result
  }

  async update(ctx){

  }
}

module.exports = new UserCtl()
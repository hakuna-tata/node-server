const userModel = require("../models/user")
const dbCollection = "user"

class UserCtl{
  async findAll(ctx){
    const users = await userModel.findAll(dbCollection)
    ctx.body = users
  }
  async register(ctx){
    const { username } = ctx.request.body
    const repeatedUser = await userModel.findOne(dbCollection,username)
    if(repeatedUser) return
    const users = await userModel.register(dbCollection,ctx.request.body)
    ctx.body = users
  }
}

module.exports = new UserCtl()
const userModel = require("../models/user")

class UserCtl{
  async findAll(ctx){
    const users = await userModel.find()
    ctx.body = users
  }
  async register(ctx){
    const users = await new userModel(ctx.request.body).save()
    ctx.body = users
  }
}

module.exports = new UserCtl()
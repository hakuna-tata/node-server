const userModel = require("../models/user")
const dbCollection = "user"

class UserCtl{
  async findAll(ctx){
    const users = await userModel.find(dbCollection,{})
    ctx.body = users
  }

  async register(ctx){
    const { username } = ctx.request.body
    const repeatedUser = await userModel.find(dbCollection,{ username })
    if(repeatedUser.length){
      ctx.body = "用户已存在"
    }else{
       const users = await userModel.add(dbCollection,ctx.request.body)
       ctx.body = users
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
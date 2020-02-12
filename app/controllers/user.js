const userModel = require("../models/user")
const { RegisterValidator } = require("../validator")
const { ConflictException, ForbiddenException, NotFoundException,Success } = require("../utils/httpException")
const dbCollection = "user"

class UserCtl{

  async checkOwner(ctx, next){
    if(ctx.params.id !== ctx.state.user._id){
      throw new ForbiddenException("没有权限")
    }
    await next()
  }

  async findAll(ctx){
    const users = await userModel.find(dbCollection,{})
    ctx.body = users
  }

  async register(ctx){
    const v = await new RegisterValidator().validate(ctx)
    const { username, email } = ctx.request.body
    const repeatedUsername = await userModel.findOne(dbCollection,{ username })
    const repeatedEmail = await userModel.findOne(dbCollection,{ email })
    if(repeatedUsername && repeatedUsername.username){
      throw new ConflictException("用户名已被占用")
    }
    if(repeatedEmail && repeatedEmail.email){
      throw new ConflictException("该邮箱已注册")
    }
    await userModel.add(dbCollection,ctx.request.body)
    Success(ctx, 201)
  }

  async remove(ctx){
    const id = ctx.params.id
    const user = await userModel.remove(dbCollection,id)
    if(user.value === null){
      throw new NotFoundException("用户不存在")
    }
    Success(ctx, 204)
  }
}

module.exports = new UserCtl()
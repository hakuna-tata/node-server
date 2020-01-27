const Router = require('koa-router')

const router = new Router({prefix: '/v1/users'})

router.get('/',(ctx) => {
  ctx.body = '这是users'
})

module.exports = router
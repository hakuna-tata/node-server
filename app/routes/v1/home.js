const Router = require('koa-router')

const router = new Router({prefix: '/v1/home'})

router.get('/',(ctx) => {
  ctx.body = '<h1>这是主页</h1>'
})

module.exports = router
const Router = require('koa-router')
const { findAll, register } =  require("../../controllers/user")
const router = new Router({prefix: '/v1/user'})

router.get('/', findAll)
router.post('/', register)

module.exports = router
const Router = require('koa-router')
const { findAll, register, checkOwner, remove } =  require("../../controllers/user")
const router = new Router({prefix: '/v1/user'})

router.get('/', findAll)
router.post('/', register)
router.delete('/:id', remove)

module.exports = router
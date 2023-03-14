const router = require('express').Router()
const apiRoutes = require('./API')
const htmlRoutes = require('./homeRoutes')

router.use('/', htmlRoutes)
router.use('/API', apiRoutes)

module.exports = router
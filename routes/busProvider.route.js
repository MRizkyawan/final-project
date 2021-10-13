const router = require('express').Router()
const {createbusProvider,readbusProvider,updatebusProvider} = require ('../controller/busProviderController')

router.post('/',createbusProvider)
router.update('/:id',updatebusProvider)
router.get('/',readbusProvider)

module.exports = router
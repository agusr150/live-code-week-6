const express = require('express')
const router = express.Router()

const UserControl = require('../controllers/userControl')
const FoodControl = require('../controllers/foodControl')

const authentication = require('../middleware/authentication')

router.post('/register', UserControl.register)
router.post('/login', UserControl.login)

router.post('/foods', authentication, FoodControl.create)
router.get('/foods', authentication, FoodControl.show)
router.delete('/foods/:id', authentication, FoodControl.hapus)


module.exports = router
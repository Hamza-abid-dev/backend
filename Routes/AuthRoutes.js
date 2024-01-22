const express = require('express')
const {Userregister, userget, userdelete, getuser, edituser, loginuser, testjwt} = require('../Controler/AuthControllers')
const verification = require('../Middlewares/verifytoken')
const router = express.Router()


router.post('/register', Userregister)
router.post('/login', loginuser)
router.get('/userget', userget)
router.delete('/userdelete/:id', userdelete)
router.get('/getuser/:id', getuser)
router.put('/edituser/:id', edituser)
router.post('/testing', verification, testjwt)
module.exports = router
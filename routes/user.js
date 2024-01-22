const express = require('express')

// controller function
const { loginUser, signupUser } = require('../controllers/userControllers')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup rote
router.post('/signup', signupUser)

module.exports = router
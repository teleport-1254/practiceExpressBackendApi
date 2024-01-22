const User = require('../models/userModel')

// jwt(json web token) for user auth
const jwt = require('jsonwebtoken')

// as mongodb uses _id, to make things simple, we'll do that too.
const createToken = (_id) => {
    // expiresIn: '3d', token will be vaild for 3 days, user will be loged in for 3 days
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        
        // creating a token
        const token = createToken(user._id)
        // token will have 3 sections, separated by '.'
        // header(with meta data), payload(with main data), and signature
    
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // console.log(email, password);
        const user = await User.signup(email, password)
        
        // creating a token
        const token = createToken(user._id)
        // token will have 3 sections, separated by '.'
        // header(with meta data), payload(with main data), and signature

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser
}
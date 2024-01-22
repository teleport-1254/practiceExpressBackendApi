const mongooes = require('mongoose')

// for email and password validation
const validator = require('validator')

// for password hashing
// also genarates a salt and appends it with the password, for extra password complexity and security
// salt is a string of random chars
const bcrypt = require('bcrypt')

const Scheme = mongooes.Schema

const userScheme = new Scheme({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// creating extra methods like 'create or find methods' present in models.
// static signup method
userScheme.statics.signup = async function(email, password) {
    // this = currrent model, which is User.
    // as we are using 'this' arrow function won't work

    // validation
    // console.log(email, password);
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not vaild')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // larger the round no., the more time it takes
    // for now its set 10
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// static login method
userScheme.statics.login = async function(email, password) {
    // this = currrent model, which is User.
    // as we are using 'this' arrow function won't work

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }
    
    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
        throw Error('Incorrect password')
    }
    
    return user
}

module.exports = mongooes.model('User', userScheme)
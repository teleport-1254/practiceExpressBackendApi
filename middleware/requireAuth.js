const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // authorization = something like, 'Bearer fwef34fff34f3eg4f34.34rf34f3.f34f334f43'
    // we only need 'fwef34fff34f3eg4f34.34rf34f3.f34f334f43' part so, 
    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth
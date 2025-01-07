const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')
const User = require('../model/user')

const verifyToken = async (req,res,next)=>{
    const auth = req.headers['Authorization'] || req.headers['authorization']
    if(!auth)
    {
        return next(new AppError('Token is required!' , 401))
    }

    try{
        const token = auth.split(' ')[0]
        //console.log(token)
        const decode = jwt.verify(token , process.env.JWTSECRETKEY)
        //console.log(decode)
        const currUser = await User.findById(decode.Id)
        //console.log(currUser)
        if(!currUser)
        {
            return next(new AppError('user not found!',404))
        }
        req.user = currUser
        next()
    }catch{
        return next(new AppError('invalid token' , 401))
    }
}

module.exports = verifyToken
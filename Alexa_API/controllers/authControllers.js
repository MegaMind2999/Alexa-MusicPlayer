const User = require('../model/user')
const CatchAsync = require('../utils/CatchAsync')
const AppError = require('../utils/AppError')
const GenerateToken = require('../utils/GenerateToken')
const bcrypt = require('bcrypt')


const signup = CatchAsync(async(req,res,next) => {
    const { username , email , password } = req.body
    const olduser = await User.findOne({email})
    if(olduser){
        return next(new AppError('user is already exist please login' , 400))
    }
    const hashPassword = await bcrypt.hash(password,12)
    const newUser = new User({
        username,
        email,
        password : hashPassword,
        profileimg : req.file.filename
    })

    const token = GenerateToken({email : newUser.email , id : newUser._id })
    newUser.token = token

    res.cookie('JWT',token,
        {
            maxAge : 86400,
            // secure : ture /// production only
            httpOnly : true
        })

    await newUser.save()
    return res.status(200).json({
        success : true,
        msg : 'Done',
        token
    })
})

const login = CatchAsync(async(req,res,next)=>{
    const { email , password } = req.body
    const user = await User.findOne({email})
    if(!user)
    {
        return next(new AppError('user not found please Sign up' , ))
    }
    const matchpass = await bcrypt.compare(password, user.password)
    if(matchpass)
    {
       const token = GenerateToken({email : user.email , Id : user._id})
       res.cookie('JWT',token , {
            maxAge : 86400,
            // secure : ture /// production only
            httpOnly : true
       })
       user.token = token,
       await user.save()
       return res.status(200).json({
            success : true,
            msg : 'login successfully',
            token,
            user
       })
    }
    return next(new AppError('Email or Password are incorrect' , ))
})

const testvalidation = (req,res,next)=>{
    res.send('valid token')
}



module.exports = {
    signup,
    login,
    testvalidation
}
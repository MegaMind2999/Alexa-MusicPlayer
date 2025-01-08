const jwt = require('jsonwebtoken')

const GenerateToken = (payloud)=>{
    const token = jwt.sign(payloud , process.env.JWTSECRETKEY,{expiresIn : '1d'})
    return token
}

module.exports = GenerateToken
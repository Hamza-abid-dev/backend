const jwt = require('jsonwebtoken');

const verification = (req, res, next)=>{
    const token = req.header('Authorization')

    try {
        if(!token){
            return res.send({Message: 'token is missing'})
        }
        const decode = jwt.verify(token, process.env.jwtkey)
        req.userId = decode.id
        next()
    } catch (error) {
        console.log(error)
    }

}
module.exports = verification
require('dotenv').config()
const jwt = require('jsonwebtoken')

function authentication(req, res, next){
    console.log('masuk authentic')
    console.log(req.headers.token)
    let token = req.headers.token
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userdata = decoded
        console.log('decoded suksesssss')
        next()
    }
    catch(err){
        res.status(400).json('salah')
    }
}

module.exports = authentication
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

class UserControl{
    static register(req,res){
        console.log(req.body.email)
        let newData = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(newData)
        User.create(newData)
        .then(data=>{
            console.log('then')
            res.status(201).json({ 
                id: data.id,
                email: data.email })
        })
        .catch(err => {
            console.log('err')
            res.status(500).json(err)
        })
    }

    static login(req, res){
        console.log(req.body.password)
        User.findOne({
            where: {email: req.body.email}
        })
        .then(data=>{
            console.log('data')
            if(!data){
                res.status(400).json('email salah')
            } else {
                if(bcrypt.compareSync(req.body.password, data.password)){
                    let token = jwt.sign({id: data.id}, process.env.JWT_SECRET)
                    res.status(200).json({ access_token: token })
                } else {
                    res.status(400).json('password salah')
                }
            }
        })
        .catch(err=>{
            console.log('err')
            res.status(500).json(err)
        })
    }
}

module.exports = UserControl
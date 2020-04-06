
const {Food} = require('../models')

class FoodControl{
    static create(req, res){
        let newData = {
            title: req.body.title,
            price: Number(req.body.price),
            ingredients: req.body.ingredients,
            tag: req.body.tag,
            UserId: req.userdata.id
        }
        console.log(newData)
        Food.create(newData)
        .then(data=>{
            res.status(200).json({ 
                title: data.title,
                price: data.price,
                ingredients: data.ingredients,
                tag: data.tag,
                UserId: data.UserId
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static show(req, res){
        console.log(req.userdata.id)
        Food.findAll({
            where: {UserId: req.userdata.id}
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static hapus(req, res){
        console.log('masuk hapus')
        Food.destroy({
            where: {
                UserId: req.userdata.id,
                id: req.params.id
            }
        })
        .then(data=>{
            res.status(200).json({ message: 'Successfully delete food from your menu'  })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = FoodControl
const { Category } = require('../models')

class CategoryController{
    static getAllCategories(req, res, next){
        Category.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findCategoryById(req, res, next){
        const { id } = req.params

        Category.findOne({where:{id}})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addCategory(req, res, next){
        const { categoryName } = req.body

        Category.create({categoryName})
            .then((data) =>{
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateCategory(req, res, next){
        const { categoryName } = req.body
        const { id } = req.params

        Category.update({categoryName},{
            where:{id},
            returning:true
        })
            .then((data) =>{
                res.status(201).json(data[1])
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCategory(req, res, next){
        const { id } = req.params

        Category.destroy({where:{id}})
            .then(()=>{
                res.status(200).json({"message":"Category Successfully Deleted"})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CategoryController
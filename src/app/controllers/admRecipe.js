// const data = require('../data.json')
// const fs = require('fs')

module.exports = {
    index(req, res) {
        return res.render('admin/recipes/index', { recipes: data.recipes })
    },
    create(req, res) {
        return res.render('admin/recipes/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "")
                return res.send('Por favor, preencha todos os campos!')
        }

        const { image, title, author, ingredients, preparation, information } = req.body

        return
    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "")
                return res.send('Por favor, preencha todos os campos!')
        }

        const { image, title, author, ingredients, preparation, information } = req.body

        return
    },
    delete(req, res) {
        return
    },
}

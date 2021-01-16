// const data = require('../data.json')
// const fs = require('fs')
const db = require('../../config/db')

module.exports = {
    index(req, res) {
        // return res.render('admin/recipes/index', { recipes: data.recipes })
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

        // const { image, title, author, ingredients, preparation, information } = req.body

        const queryRecipes = `
        INSERT INTO recipes(
            image, 
            title,
            author,
            information
        ) VALUES ($1, $2, $3, $4)

        RETURNING id
        `

        const valuesRecipes = [
            req.body.image,
            req.body.title,
            req.body.author,
            req.body.information
        ]


        db.query(queryRecipes, valuesRecipes, function (err, results) {
            if (err) return res.send("Não foi possível cadastrar a nova receita")

            var newRecipeId = results.rows[0].id
            // return res.redirect(`//admin/recipes/:${results.rows[0].id}`)

            const queryIngredients = `
            INSERT INTO ingredients(
                ingredients,
                recipes_id
            ) VALUES ($1, $2)
    
            RETURNING id
            `
            console.log(req.body)
            const valuesIngredients = [
                req.body.ingredients,
                newRecipeId
            ]

            db.query(queryIngredients, valuesIngredients, function (err, results) {
                if (err) return res.send("Não foi possível cadastrar os ingredientes")
                // console.log(results)
                // return res.redirect(`//admin/recipes/:${results.rows[0].id}`)
            })

            const queryPreparation = `
            INSERT INTO preparation(
                preparation,
                recipes_id
            ) VALUES ($1, $2)
    
            RETURNING id
            `
            console.log(req.body)
            const valuesPreparation = [
                req.body.preparation,
                newRecipeId
            ]

            db.query(queryPreparation, valuesPreparation, function (err, results) {
                if (err) return res.send("Não foi possível cadastrar a preparação")
                // console.log(results)
                // return res.redirect(`//admin/recipes/:${results.rows[0].id}`)
            })

            return res.redirect(`/admin/recipes/:${results.rows[0].id}`)
        })



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


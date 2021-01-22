// const data = require('../data.json')
// const fs = require('fs')

const recipe = require('../models/recipe')

module.exports = {
    index(req, res) {

        recipe.all(function (recipes) {
            return res.render('admin/recipes/index', { recipes })
        })
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

        recipe.create(req.body, function (recipe) {

            setTimeout(() => {
                return res.redirect(`recipes/${recipe.id}`)
                // return res.redirect('/admin/recipes')
            }, 2000);
        })



    },
    show(req, res) {

        recipe.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Receita não encontrada")

            let recipeIngredientsLength = recipe.ingredients.length
            let recipeIngredients = recipe.ingredients.substring(2, recipeIngredientsLength - 2)

            recipe.ingredients = recipeIngredients.split('","')

            let recipePrepararionLength = recipe.preparation.length
            let recipePreparation = recipe.preparation.substring(2, recipePrepararionLength - 2)

            recipe.preparation = recipePreparation.split('","')

            return res.render('admin/recipes/show', { recipe })
        })

    },
    edit(req, res) {

        recipe.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Receita não encontrada")

            let recipeIngredientsLength = recipe.ingredients.length
            let recipeIngredients = recipe.ingredients.substring(2, recipeIngredientsLength - 2)

            recipe.ingredients = recipeIngredients.split('","')

            let recipePrepararionLength = recipe.preparation.length
            let recipePreparation = recipe.preparation.substring(2, recipePrepararionLength - 2)

            recipe.preparation = recipePreparation.split('","')

            return res.render('admin/recipes/edit', { recipe })
        })

    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "")
                return res.send('Por favor, preencha todos os campos!')
        }

        recipe.update(req.body, function () {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res) {
        recipe.delete(req.body.id, function () {
            return res.redirect(`/admin/recipes`)
        })
    },
}


const fs = require('fs')
const recipes = require('../data')



//create
exports.create = function(req, res){
    return res.render('admin/recipes/create')
}

//list
exports.index = function(req, res){
    return res.render('admin/recipes/',  { recipes })
}

//show
exports.show = function(req, res){
    const index = req.params.index
    return res.render('admin/recipes/show', {data: recipes, index})
}

//edit
exports.edit = function(req, res) {
    const recipeIndex = req.params.index
    const foundRecipe = recipes[recipeIndex]

    if (!foundRecipe) return res.send('recipe not found')

    const recipes = {
        ...foundRecipe,
    }
    return res.render('admin/recipes/edit', { data: recipes, index })

}

const express = require('express')
const routes = express.Router()
const recipe = require('./controllers/recipe')
const recipes = require('./data')

routes.get('/', function(req, res){
    return res.render('index', {data: recipes})
})

routes.get('/about', function(req, res){
    return res.render('about')
})

routes.get('/recipes-page', function(req, res){
    return res.render('recipes-page',  { recipes })
})

routes.get("/recipes/:index", function (req, res){
    const index = req.params.index
    return res.render("recipes", {data: recipes, index})
})

//routes.get("/admin/recipes", recipe.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipe.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:index", recipe.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:index/edit", recipes.edit); // Mostrar formulário de edição de receita

// routes.post("/admin/recipes", recipe.post); // Cadastrar nova receita
// routes.put("/admin/recipes", recipe.put); // Editar uma receita
// routes.delete("/admin/recipes", recipe.delete); // Deletar uma receita

module.exports = routes
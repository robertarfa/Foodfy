const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const recipes = require('./data')

server.use(express.static('public'))
//no render não precisa colocar .html pq essa linha já faz isso
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    noCache: true,
    autoescape: false
})

server.get('/', function(req, res){
    return res.render('index', {data: recipes})
})

server.get('/about', function(req, res){
    return res.render('about')
})

server.get('/recipes', function(req, res){
    return res.render('recipes',  {data: recipes})
})

server.get('/recipe', function(req, res){
    return res.render('recipe')
})

// server.get("/recipes/:index", function (req, res) {
//     const recipes = []; // Array de receitas carregadas do data.js
//     const recipeIndex = req.params.index;
  
//     console.log(receipts[recipeIndex]);
//   })
//porta onde o servidor está rodando
server.listen(5000, function(){
    console.log('server is running')
})

const db = require('../../config/db')

module.exports = {
  all(callback) {

    db.query(`SELECT recipes.id, recipes.image, recipes.title, recipes.author, recipes.information, ingredients.ingredients, preparation.preparation  FROM recipes
    INNER JOIN ingredients 
    ON recipes.id = ingredients.recipes_id
    INNER JOIN preparation 
    ON recipes.id = preparation.recipes_id
    ORDER BY recipes.title ASC`,

      function (err, results) {
        if (err) throw `Não foi possível carregar os dados ${err}`
        // console.log(results)

        callback(results.rows)

      })

  },
  create(data, callback) {
    // console.log(data)
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
      data.image,
      data.title,
      data.author,
      data.information
    ]


    db.query(queryRecipes, valuesRecipes, function (err, results) {
      if (err) throw `Não foi possível cadastrar a nova receita ${err}`

      var newRecipeId = results.rows[0].id
      // return res.redirect(`//admin/recipes/:${results.rows[0].id}`)

      const queryIngredients = `
        INSERT INTO ingredients(
            ingredients,
            recipes_id
        ) VALUES ($1, $2)

        RETURNING id
        `
      // console.log(data)
      const valuesIngredients = [
        data.ingredients,
        newRecipeId
      ]

      db.query(queryIngredients, valuesIngredients, function (err, results) {
        if (err) throw `Não foi possível cadastrar os ingredientes ${err}`
        // console.log(err)
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
      // console.log(data)
      const valuesPreparation = [
        data.preparation,
        newRecipeId
      ]

      db.query(queryPreparation, valuesPreparation, function (err, results) {
        if (err) throw `Não foi possível cadastrar a preparação ${err}`
        // console.log(err)
        // console.log(results)
        // return res.redirect(`//admin/recipes/:${results.rows[0].id}`)
      })

      callback(results.rows[0])

    })

  },
  find(id, callback) {

    db.query(`SELECT recipes.id, recipes.image, recipes.title, recipes.author, recipes.information, ingredients.ingredients, preparation.preparation  FROM recipes
    INNER JOIN ingredients 
    ON recipes.id = ingredients.recipes_id
    INNER JOIN preparation 
    ON recipes.id = preparation.recipes_id
    WHERE recipes.id = $1`, [id], function (err, results) {

      if (err) throw "Não foi possível recuperar os dados"

      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
    UPDATE recipes SET
    image=($1), 
    title=($2),
    author=($3),
    information=($4)
    WHERE id = $5
    `

    const values = [
      data.image,
      data.title,
      data.author,
      data.information,
      data.id
    ]

    db.query(query, values, function (err, results) {
      if (err) throw `Não foi possível alterar a receita ${err}`

      const queryIngredients = `
      UPDATE ingredients SET
          ingredients=($1)
          WHERE recipes_id = $2
      `
      // console.log(data)
      const valuesIngredients = [
        data.ingredients,
        data.id
      ]

      db.query(queryIngredients, valuesIngredients, function (err, results) {
        if (err) throw `Não foi possível cadastrar os ingredientes ${err}`
        // console.log(err)
        // console.log(results)
        // return res.redirect(`//admin/recipes/:${results.rows[0].id}`)
      })

      const queryPreparation = `
    UPDATE preparation SET
          preparation=($1)
          WHERE recipes_id = $2
          `
      // console.log(data)
      const valuesPreparation = [
        data.preparation,
        data.id
      ]

      db.query(queryPreparation, valuesPreparation, function (err, results) {
        if (err) throw `Não foi possível cadastrar a preparação ${err}`
        // console.log(err)
        // console.log(results)
        // return res.redirect(`//admin/recipes/:${results.rows[0].id}`)
      })

      callback()
    })


  },
  async delete(id, callback) {
    let query = `DELETE FROM recipes WHERE id = $1`

    await db.query(query, [id])

    query = `DELETE FROM ingredients WHERE recipes_id = $1`

    await db.query(query, [id])

    query = `DELETE FROM preparation WHERE recipes_id = $1`

    await db.query(query, [id])

    return callback()
  },
  async paginate(params) {
    const { limit, offset, callback } = params

    let query = `SELECT 
    (SELECT count(*) FROM recipes) AS total,
    recipes.id, recipes.image, recipes.title, recipes.author, recipes.information, ingredients.ingredients, preparation.preparation  
    FROM recipes
        INNER JOIN ingredients 
        ON recipes.id = ingredients.recipes_id
        INNER JOIN preparation 
        ON recipes.id = preparation.recipes_id
        GROUP BY recipes.id, ingredients.ingredients, preparation.preparation LIMIT $1 OFFSET $2
    `

    await db.query(query, [limit, offset], function (err, results) {
      if (err) throw { err }
      callback(results.rows)
    })


  }
}
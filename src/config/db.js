const { Pool } = require("pg") // para conectar somente uma vez no banco e não precisar ficar colocando user/senha no banco

module.exports = new Pool({
  user: "postgres",
  password: '123456789',
  host: "localhost",
  port: 5432,
  database: "db_foodfy",

})
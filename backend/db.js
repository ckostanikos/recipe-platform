const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "Sorasan1997@",
    database: "recipe_platform",
  })
  .promise();

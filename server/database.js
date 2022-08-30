import { Sequelize } from "sequelize";


const Database = new Sequelize({
    database: "webdb",
    username: "postgres",
    password: "admin",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    /*dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }*/
});

export default Database;
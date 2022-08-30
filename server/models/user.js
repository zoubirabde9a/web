import { Sequelize } from "sequelize";
import Database from "../database.js";

const User = Database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true          
    },
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    }
})
User.sync({ alter: true })

export default User;
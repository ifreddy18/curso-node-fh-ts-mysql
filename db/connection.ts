import { Sequelize } from 'sequelize';

const db = new Sequelize('curso-node', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;
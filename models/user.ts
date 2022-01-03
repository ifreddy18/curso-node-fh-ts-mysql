import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    state: {
        type: DataTypes.TINYINT,
    }
});

export default User;
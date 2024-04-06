import bcrypt from 'bcryptjs'
import {DataTypes} from 'sequelize'

export const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {msg: 'Username is required'}
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {msg: 'Email is required'}
    }
  },
  password: DataTypes.STRING,
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}

export const getDefaultUsers = async () => [
  {
    username: 'admin',
    email: 'admin@example.com',
    name: 'Admin',
    password: await bcrypt.hash('admin', 10),
    isAdmin: true
  },
  {
    username: 'user',
    email: 'user@example.com',
    name: 'User',
    password: await bcrypt.hash('user', 10),
    isAdmin: false
  }
]

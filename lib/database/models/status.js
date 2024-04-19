import {DataTypes} from 'sequelize'

export const StatusSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  addTask: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  bgColor: DataTypes.STRING,
  textColor: DataTypes.STRING,
}

export const defaultStatuses = [
  {
    title: 'To Do',
    order: 0,
    isDefault: true,
    addTask: true,
    bgColor: '#eee',
    textColor: '#222'
  },
  {
    title: 'In Progress',
    order: 1,
    isDefault: false,
    addTask: true,
    bgColor: '#b3d2fe',
    textColor: '#00369b'
  },
  {
    title: 'Done',
    order: 2,
    isDefault: false,
    addTask: false,
    bgColor: '#a9f2cf',
    textColor: '#005132'
  }
]

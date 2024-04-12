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
  }
}

export const defaultStatuses = [
  {title: 'To Do', order: 0, isDefault: true, addTask: true},
  {title: 'In Progress', order: 1, isDefault: false, addTask: true},
  {title: 'Done', order: 2, isDefault: false, addTask: false}
]

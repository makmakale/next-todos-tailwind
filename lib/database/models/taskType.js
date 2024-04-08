import {DataTypes} from 'sequelize'

export const TaskTypeSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {msg: 'Title is required'}
    }
  },
  alias: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: 'Alias is required'}
    },
    unique: {
      args: true,
      msg: 'Alias is not unique'
    }
  },
  description: DataTypes.STRING,
  color: DataTypes.STRING,
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}

export const defaultTaskTypes = [
  {
    title: 'Epic',
    alias: 'epic',
    description: '',
    color: '#8f4edc',
    order: 0,
    isDefault: false
  },
  {
    title: 'Story',
    alias: 'story',
    description: '',
    color: '#34c666',
    order: 1,
    isDefault: false
  },
  {
    title: 'Task',
    alias: 'task',
    description: '',
    color: '#3192e7',
    order: 2,
    isDefault: true
  },
  {
    title: 'Bug',
    alias: 'bug',
    description: '',
    color: '#d23333',
    order: 3,
    isDefault: false
  }
]

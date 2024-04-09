import {DataTypes} from 'sequelize'

export const TaskPrioritySchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Title is not unique'
    },
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

export const defaultPriorities = [
  {
    title: 'Highest',
    alias: 'highest',
    description: 'This problem will block progress.',
    color: '#f8623e',
    order: 0,
    isDefault: false
  },
  {
    title: 'High',
    alias: 'high',
    description: 'Serious problem that could block progress.',
    color: '#f8623e',
    order: 1,
    isDefault: false
  },
  {
    title: 'Medium',
    alias: 'medium',
    description: 'Has potential to affect progress.',
    color: '#fab136',
    order: 2,
    isDefault: true
  },
  {
    title: 'Low',
    alias: 'low',
    description: 'Minor problem or easily worked around.',
    color: '#2a62f8',
    order: 3,
    isDefault: false
  },
  {
    title: 'Lowest',
    alias: 'lowest',
    description: 'Trivial problem with little or no impact on progress.',
    color: '#2a62f8',
    order: 4,
    isDefault: false
  }
]

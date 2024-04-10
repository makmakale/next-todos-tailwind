import { DataTypes } from 'sequelize';

export const TaskSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  // projectId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'projects',
  //     key: 'id',
  //   },
  // },
};

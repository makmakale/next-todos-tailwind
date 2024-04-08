import {UserSchema} from '@/lib/database/models/user'
import {ProjectSchema} from "@/lib/database/models/project";
import {StatusSchema} from "@/lib/database/models/status";
import {TaskSchema} from "@/lib/database/models/task";
import {TaskTypeSchema} from "@/lib/database/models/taskType";
import {TaskPrioritySchema} from "@/lib/database/models/taskPriority";

export const defineModels = (sequelize) => {
  const User = sequelize.define('user', UserSchema)
  const Project = sequelize.define('project', ProjectSchema)
  const Status = sequelize.define('column', StatusSchema)
  const Task = sequelize.define('task', TaskSchema)
  const TaskType = sequelize.define('type', TaskTypeSchema)
  const TaskPriority = sequelize.define('priority', TaskPrioritySchema)

  Status.hasMany(Task, {onUpdate: 'CASCADE', onDelete: 'SET NULL'})
  Task.belongsTo(Status)
  Project.hasMany(Task, {onUpdate: 'CASCADE', onDelete: 'SET NULL'})
  Task.belongsTo(Project)

  Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'assignee'
  })
  Task.belongsTo(User, {
    foreignKey: 'createdBy',
    as: 'author'
  })

  TaskPriority.hasMany(Task, {onUpdate: 'CASCADE', onDelete: 'SET NULL'})
  Task.belongsTo(TaskPriority)
  TaskType.hasMany(Task, {onUpdate: 'CASCADE', onDelete: 'SET NULL'})
  Task.belongsTo(TaskType)

  return {
    User,
    Project,
    Status,
    Task,
    TaskType,
    TaskPriority
  }
}

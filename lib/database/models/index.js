import {UserSchema} from '@/lib/database/models/user';
import {ProjectSchema} from '@/lib/database/models/project';
import {StatusSchema} from '@/lib/database/models/status';
import {TaskSchema} from '@/lib/database/models/task';
import {TaskTypeSchema} from '@/lib/database/models/taskType';
import {TaskPrioritySchema} from '@/lib/database/models/taskPriority';

export const defineModels = (sequelize) => {
  const User = sequelize.define('user', UserSchema);
  const Project = sequelize.define('project', ProjectSchema);
  const Status = sequelize.define('status', StatusSchema);
  const Task = sequelize.define('task', TaskSchema);
  const TaskType = sequelize.define('type', TaskTypeSchema);
  const TaskPriority = sequelize.define('priority', TaskPrioritySchema);

  Task.belongsTo(Project);
  Task.belongsTo(Status);
  Task.belongsTo(TaskPriority);
  Task.belongsTo(TaskType);
  Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'assignee',
  });
  Task.belongsTo(User, {
    foreignKey: 'createdBy',
    as: 'reporter',
  });
  Status.hasMany(Task)

  // for test
  Status.sync({alter: true})

  return {
    User,
    Project,
    Status,
    Task,
    TaskType,
    TaskPriority,
  };
};

'use server';
import {
  dbSearchQuery,
  Project,
  Status,
  Task,
  TaskPriority,
  TaskType,
  User,
} from '@/lib/database/sequelize';
import { toJSON } from '@/lib/utils/data';

export const getListOfTasks = async ({
  limit = 5,
  offset = 0,
  q = '',
  userId, columnId,
}) => {
  const userFilter = +userId ? {userId: +userId} : {};
  const columnFilter = +columnId ? {columnId: +columnId} : {};

  try {
    const tasks = await Task.findAndCountAll({
      where: {
        title: dbSearchQuery(q),
        ...userFilter,
        ...columnFilter,
      },
      order: ['order'],
      limit,
      offset: offset * limit,
      include: [
        {
          model: User,
          as: 'assignee',
        },
        {
          model: Status,
          as: 'status',
        },
        {
          model: Project,
          as: 'project',
        },
        {
          model: TaskType,
          as: 'type',
        },
        {
          model: TaskPriority,
          as: 'priority',
        },
      ],
    });

    return {success: toJSON(tasks)};
  } catch (err) {
    console.log(err);
    console.error('Failed to fetch tasks', err);
    return {error: err.message};
  }
};

export const deleteTask = async (id) => {
  if (!id || id === 'undefined') return;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return {error: 'Task not found'};
    }

    await task.destroy();

    return {success: 'Task was deleted'};
  } catch (err) {
    console.error('Failed to delete task', err);
    return {error: err.message};
  }
};

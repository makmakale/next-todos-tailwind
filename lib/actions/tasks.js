'use server';
import {dbSearchQuery, Project, Status, Task, TaskPriority, TaskType, User,} from '@/lib/database/sequelize';
import {toJSON} from '@/lib/utils/data';
import {revalidatePath} from "next/cache";
import {TaskSchema} from "@/lib/form/validation";

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
        {model: User, as: 'reporter',},
        {model: User, as: 'assignee',},
        {model: Status, as: 'status',},
        {model: Project, as: 'project',},
        {model: TaskType, as: 'type',},
        {model: TaskPriority, as: 'priority',},
      ],
    });

    return {data: toJSON(tasks)};
  } catch (err) {
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

export const createTask = async (body) => {
  if (!body) return

  try {
    // check if fields are valid
    const isValid = TaskSchema.isValid(body)
    if (!isValid) {
      return {error: 'Invalid fields'}
    }

    const count = await Task.count()
    const task = await Task.create({
      ...body,
      priorityId: body.priorityId || null,
      userId: body.userId || null,
      order: count,
    })
    revalidatePath('/tasks', 'page')

    return {data: toJSON(task)}
  } catch (err) {
    console.error('Failed to create task', err)
    return {error: err.message}
  }
}

export const getTaskById = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const task = await Task.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['name', 'image'],
          as: 'reporter'
        },
        {
          model: User,
          attributes: ['name', 'image'],
          as: 'assignee'
        }
      ]
    })

    return {data: toJSON(task)}
  } catch (err) {
    console.error('Failed to fetch task', err)
    return {error: err.message}
  }
}

export const updateTask = async (body, id) => {
  if (!id || id === 'undefined' || !body) return

  try {
    // check if task is exists
    const task = await Task.findByPk(id)
    if (!task) {
      return {error: 'Task not found'}
    }

    // check if fields are valid
    const isValid = TaskSchema.isValid(body)
    if (!isValid) {
      return {error: 'Invalid fields'}
    }

    await task.update({
      ...body,
      priorityId: body.priorityId || null,
      userId: body.userId || null,
    })
    await task.save()
    revalidatePath('/tasks', 'page')

    return {data: toJSON(task)}
  } catch (err) {
    console.error('Failed to update task', err)
    return {error: err.message}
  }
}
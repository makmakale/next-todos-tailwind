'use server'
import {Project, Status, Task, TaskPriority, TaskType, User} from '@/lib/database/sequelize'

import * as sequelize from 'sequelize'
import {toJSON} from "@/lib/data";

export const getListOfTasks = async ({
  limit = 5,
  offset = 0,
  title = '',
  userId, columnId
}) => {
  const userFilter = +userId ? {userId: +userId} : {}
  const columnFilter = +columnId ? {columnId: +columnId} : {}
  let lookupValue = title.toLowerCase();

  try {
    const tasks = await Task.findAndCountAll({
      where: {
        title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + lookupValue + '%'),
        ...userFilter,
        ...columnFilter
      },
      order: ['order'],
      limit,
      offset: offset * limit,
      include: [
        {
          model: User,
          attributes: ['name'],
          as: 'assignee'
        },
        {
          model: Status,
          attributes: ['id', 'title'],
          as: 'column'
        },
        {
          model: Project,
          attributes: ['id', 'alias'],
          as: 'project'
        },
        {
          model: TaskType,
          attributes: ['id', 'title', 'color'],
          as: 'type'
        },
        {
          model: TaskPriority,
          attributes: ['id', 'title', 'color'],
          as: 'priority'
        }
      ]
    })

    return {success: toJSON(tasks)}
  } catch (err) {
    console.error('Failed to fetch tasks')
    return {error: err.message}
  }
}

export const deleteTask = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const task = await Task.findByPk(id)
    if (!task) {
      return {error: 'Task not found'}
    }

    await task.destroy()

    return {success: "Task was deleted"}
  } catch (err) {
    console.error('Failed to delete task')
    return {error: err.message}
  }
}

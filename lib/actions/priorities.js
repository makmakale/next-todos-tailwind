'use server'
import {dbSearchQuery, TaskPriority} from '@/lib/database/sequelize'
import {Op} from 'sequelize'
import {toJSON} from "@/lib/data";

export const getListOfPriorities = async ({
  limit = 5,
  offset = 0,
  q = ''
}) => {
  try {
    const priorities = await TaskPriority.findAndCountAll({
      where: {
        title: dbSearchQuery(q),
      },
      order: ['order'],
      limit,
      offset: offset * limit
    })

    return {success: toJSON(priorities)}
  } catch (err) {
    console.error('Failed to fetch priorities')
    return {error: err.message}
  }
}

export const setDefaultPriority = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const priority = await TaskPriority.findByPk(id)
    if (!priority) {
      return {error: 'Priority not found'}
    }

    const prevDefault = await TaskPriority.findOne({
      where: {isDefault: true, id: {[Op.ne]: id}}
    })
    if (prevDefault) {
      await prevDefault.update({isDefault: false})
      await prevDefault.save()
    }

    await priority.update({isDefault: true})
    await priority.save()

    return {success: "Priority was set as default"}
  } catch (err) {
    console.error('Failed to set default priority')
    return {error: err.message}
  }
}

export const deletePriority = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const priority = await TaskPriority.findByPk(id)
    if (!priority) {
      return {error: 'Priority not found'}
    }

    await priority.destroy()

    return {success: "Priority was deleted"}
  } catch (err) {
    console.error('Failed to delete priority')
    return {error: err.message}
  }
}

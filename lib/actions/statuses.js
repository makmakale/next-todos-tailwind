'use server'
import {dbSearchQuery, Status, Task} from '@/lib/database/sequelize'
import {Op} from 'sequelize'
import {toJSON} from "@/lib/utils/data";

export const getListOfStatuses = async ({
  limit = 5,
  offset = 0,
  q = ''
}) => {
  try {
    const columns = await Status.findAndCountAll({
      where: {
        title: dbSearchQuery(q),
      },
      order: ['order'],
      limit,
      offset: offset * limit
    })

    return {success: toJSON(columns)}
  } catch (err) {
    console.error('Failed to fetch columns')
    return {error: err.message}
  }
}

export const setDefaultStatus = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const column = await Status.findByPk(id)
    if (!column) {
      return {error: 'Status not found'}
    }

    const prevDefault = await Status.findOne({
      where: {isDefault: true, id: {[Op.ne]: id}}
    })
    if (prevDefault) {
      await prevDefault.update({isDefault: false})
      await prevDefault.save()
    }

    await column.update({isDefault: true})
    await column.save()

    return {success: "Status was set as default"}
  } catch (err) {
    console.error('Failed to set default status')
    return {error: err.message}
  }
}

export const deleteStatus = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const column = await Status.findOne({
      where: {id},
      include: [{model: Task, attributes: ['id']}]
    })

    if (!column) {
      return {error: 'Status not found'}
    }

    if (column.tasks.length > 0) {
      return {error: 'Status contain tasks. Please delete or move them first.'}
    }

    await column.destroy()

    return {success: "Status was deleted"}
  } catch (err) {
    console.error('Failed to delete status')
    return {error: err.message}
  }
}

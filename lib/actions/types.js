'use server'
import {TaskType} from '@/lib/database/sequelize'
import * as sequelize from 'sequelize'
import {Op} from 'sequelize'
import {toJSON} from "@/lib/data";

export const getListOfTypes = async ({
  limit = 5,
  offset = 0,
  title = ''
}) => {
  try {
    let lookupValue = title.toLowerCase();

    const types = await TaskType.findAndCountAll({
      where: {
        title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + lookupValue + '%'),
      },
      order: ['order'],
      limit,
      offset: offset * limit
    })

    return {success: toJSON(types)}
  } catch (err) {
    console.error('Failed to fetch types')
    return {error: err.message}
  }
}

export const setDefaultType = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const type = await TaskType.findByPk(id)
    if (!type) {
      return {error: 'Type not found'}
    }

    const prevDefault = await TaskType.findOne({
      where: {isDefault: true, id: {[Op.ne]: id}}
    })
    if (prevDefault) {
      await prevDefault.update({isDefault: false})
      await prevDefault.save()
    }

    await type.update({isDefault: true})
    await type.save()

    return {success: "Type was set as default"}
  } catch (err) {
    console.error('Failed to set default type')
    return {error: err.message}
  }
}

export const deleteType = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const type = await TaskType.findByPk(id)
    if (!type) {
      return {error: 'Type not found'}
    }

    await type.destroy()

    return {success: "Type was deleted"}
  } catch (err) {
    console.error('Failed to delete type')
    return {error: err.message}
  }
}
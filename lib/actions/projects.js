'use server'
import {toJSON} from '@/lib/data'
import * as sequelize from 'sequelize'
import {Op} from 'sequelize'
import {Project, Task} from '@/lib/database/sequelize'

export const getListOfProjects = async ({
  limit = 5,
  offset = 0,
  title = ''
}) => {
  try {
    let lookupValue = title.toLowerCase();

    const projects = await Project.findAndCountAll({
      where: {
        title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + lookupValue + '%'),
      },
      order: ['order'],
      limit,
      offset: offset * limit
    })

    return {success: toJSON(projects)}
  } catch (err) {
    console.error('Failed to fetch projects')
    return {error: err.message}
  }
}

export const setDefaultProject = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const project = await Project.findByPk(id)
    if (!project) {
      return {error: 'Project not found'}
    }

    const prevDefault = await Project.findOne({
      where: {isDefault: true, id: {[Op.ne]: id}}
    })
    if (prevDefault) {
      await prevDefault.update({isDefault: false})
      await prevDefault.save()
    }

    await project.update({isDefault: true})
    await project.save()

    return {success: "Project was set as default"}
  } catch (err) {
    console.error('Failed to set default project')
    return {error: err.message}
  }
}

export const deleteProject = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const project = await Project.findOne({
      where: {id},
      include: [{model: Task, attributes: ['id']}]
    })
    if (!project) {
      return {error: 'Project not found'}
    }

    if (project.tasks.length > 0) {
      return {error: 'Project contain tasks. Please delete or move them first.'}
    }

    await project.destroy()

    return {success: "Project was deleted"}
  } catch (err) {
    console.error('Failed to delete project')
    return {error: err.message}
  }
}
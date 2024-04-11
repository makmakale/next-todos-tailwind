'use server';
import {toJSON} from '@/lib/utils/data';
import {Op} from 'sequelize';
import {dbSearchQuery, Project, Task} from '@/lib/database/sequelize';

export const getListOfProjects = async ({
  limit = 5,
  offset = 0,
  q = '',
}) => {
  try {
    const projects = await Project.findAndCountAll({
      where: {
        title: dbSearchQuery(q),
      },
      order: ['order'],
      limit,
      offset: offset * limit,
    });

    return {data: toJSON(projects)};
  } catch (err) {
    console.error('Failed to fetch projects', err);
    return {error: err.message};
  }
};

export const setDefaultProject = async (id) => {
  if (!id || id === 'undefined') return;

  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return {error: 'Project not found'};
    }

    const prevDefault = await Project.findOne({
      where: {isDefault: true, id: {[Op.ne]: id}},
    });
    if (prevDefault) {
      await prevDefault.update({isDefault: false});
      await prevDefault.save();
    }

    await project.update({isDefault: true});
    await project.save();

    return {success: 'Project was set as default'};
  } catch (err) {
    console.error('Failed to set default project', err);
    return {error: err.message};
  }
};

export const deleteProject = async (id) => {
  if (!id || id === 'undefined') return;

  try {
    const project = await Project.findOne({
      where: {id},
      include: [{model: Task, attributes: ['id']}],
    });
    if (!project) {
      return {error: 'Project not found'};
    }

    if (project.tasks.length > 0) {
      return {error: 'Project contain tasks. Please delete or move them first.'};
    }

    await project.destroy();

    return {success: 'Project was deleted'};
  } catch (err) {
    console.error('Failed to delete project', err);
    return {error: err.message};
  }
};

export const getProjectSelectOptions = async () => {
  try {
    const projects = await Project.findAll({
      attributes: [['id', 'value'], ['title', 'label'], 'isDefault'],
      order: [['order', 'asc']],
    });

    return {data: toJSON(projects)};
  } catch (err) {
    console.error('Failed to fetch options');
    return {error: err.message};
  }
};
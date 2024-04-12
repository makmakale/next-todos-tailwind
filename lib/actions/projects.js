'use server';
import {toJSON} from '@/lib/utils/data';
import {Op} from 'sequelize';
import {dbSearchQuery, Project, Task} from '@/lib/database/sequelize';
import {revalidatePath} from "next/cache";
import {ProjectSchema} from "@/lib/form/validation";

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

export const createProject = async (body) => {
  if (!body) return

  try {
    // check if fields are valid
    const isValid = ProjectSchema.isValid(body)
    if (!isValid) {
      return {error: 'Invalid fields'}
    }

    // check if same title or alias already in use
    const isExist = await Project.findOne({
      where: {
        [Op.or]: [{title: body.title}, {alias: body.alias}]
      }
    })

    if (isExist) {
      return {error: 'Title or alias already in use'}
    }

    // check if other project is already set as default
    if (body.isDefault) {
      const prevDefault = await Project.findOne({
        where: {isDefault: true, id: {[Op.ne]: id}},
      })
      if (prevDefault) {
        await prevDefault.update({isDefault: false});
        await prevDefault.save();
      }
    }

    const count = await Project.count()
    const project = await Project.create({
      ...body,
      order: count
    })

    return {data: toJSON(project)}
  } catch (err) {
    console.error('Failed to create project', err)
    return {error: err.message}
  }
}

export const getProjectById = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const project = await Project.findByPk(id)

    return {data: toJSON(project)}
  } catch (err) {
    console.error('Failed to fetch project', err)
    return {error: err.message}
  }
}

export const updateProject = async (body, id) => {
  if (!id || id === 'undefined' || !body) return

  try {
    // check if project is exists
    const project = await Project.findByPk(id)
    if (!project) {
      return {error: 'Project not found'}
    }

    // check if fields are valid
    const isValid = ProjectSchema.isValid(body)
    if (!isValid) {
      return {error: 'Invalid fields'}
    }

    // check if same title or alias already in use
    const isExist = await Project.findOne({
      where: {
        [Op.or]: [{title: body.title}, {alias: body.alias}],
        id: {[Op.ne]: id}
      }
    })
    if (isExist) {
      return {error: 'Title or alias already in use'}
    }

    // check if other project is already set as default
    if (body.isDefault) {
      const prevDefault = await Project.findOne({
        where: {isDefault: true, id: {[Op.ne]: id}},
      })
      if (prevDefault) {
        await prevDefault.update({isDefault: false});
        await prevDefault.save();
      }
    }

    await project.update(body)
    await project.save()
    revalidatePath('/projects/edit/[id]', 'page')

    return {data: toJSON(project)}
  } catch (err) {
    console.error('Failed to update project', err)
    return {error: err.message}
  }
}
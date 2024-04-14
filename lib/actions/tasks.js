'use server';
import {dbSearchQuery, Project, Status, Task, TaskPriority, TaskType, User,} from '@/lib/database/sequelize';
import {toJSON} from '@/lib/utils/data';
import {TaskSchema} from "@/lib/form/validation";
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants";
import {getSessionUser} from "@/lib/utils/users";

export const getListOfTasks = async (options = {}) => {
  const {
    limit = DEFAULT_PAGE_SIZE,
    offset = DEFAULT_PAGE_INDEX,
    q = '',
    userId, columnId,
  } = options

  const userFilter = +userId ? {userId: +userId} : {};
  const columnFilter = +columnId ? {columnId: +columnId} : {};

  try {
    const tasks = await Task.findAndCountAll({
      where: {
        title: dbSearchQuery(q),
        ...userFilter,
        ...columnFilter,
      },
      order: [['createdAt', 'desc']],
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

export const getOptionsForTask = async () => {
  const options = {}

  try {
    options.project = await Project.findAll({
      attributes: [['id', 'value'], ['title', 'label'], 'isDefault'],
      order: [['order', 'asc']],
    });
    options.status = await Status.findAll({
      attributes: [['id', 'value'], ['title', 'label'], 'isDefault'],
      order: [['order', 'asc']],
    });
    options.type = await TaskType.findAll({
      attributes: [['id', 'value'], ['title', 'label'], 'isDefault'],
      order: [['order', 'asc']],
    });
    options.priority = await TaskPriority.findAll({
      attributes: [['id', 'value'], ['title', 'label'], 'isDefault'],
      order: [['order', 'asc']],
    });
    options.assignee = await User.findAll({
      attributes: [['id', 'value'], ['name', 'label']],
      order: [['name', 'asc']],
    });

    return {data: toJSON(options)};
  } catch (err) {
    console.error('Failed to fetch task options', err)
    return {error: err.message}
  }
}

export const createTask = async (body) => {
  if (!body) return

  try {
    await TaskSchema.validate(body)

    const data = TaskSchema.cast(body)
    const {statusId, createdBy} = data

    if (!statusId) {
      const defaultStatus = await Status.findOne({where: {isDefault: true}, raw: true})
      data.statusId = defaultStatus.id
    }
    if (!createdBy) {
      const user = await getSessionUser()
      data.createdBy = user.id
    }

    const count = await Task.count()
    const task = await Task.create({
      ...body,
      order: count,
    })

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
    await TaskSchema.validate(body)

    // check if task is exists
    const task = await Task.findByPk(id)
    if (!task) {
      return {error: 'Task not found'}
    }

    const data = TaskSchema.cast(body)
    const {statusId, createdBy} = data

    if (!statusId) {
      const defaultStatus = await Status.findOne({where: {isDefault: true}, raw: true})
      data.statusId = defaultStatus.id
    }
    if (!createdBy) {
      const user = await getSessionUser()
      data.createdBy = user.id
    }

    await task.update(data)
    await task.save()

    return {data: toJSON(task)}
  } catch (err) {
    console.error('Failed to update task', err)
    return {error: err.message}
  }
}
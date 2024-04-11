'use server';
import {dbSearchQuery, TaskType} from '@/lib/database/sequelize';
import {Op} from 'sequelize';
import {toJSON} from '@/lib/utils/data';

export const getListOfTypes = async ({
  limit = 5,
  offset = 0,
  q = '',
}) => {
  try {
    const types = await TaskType.findAndCountAll({
      where: {
        title: dbSearchQuery(q),
      },
      order: ['order'],
      limit,
      offset: offset * limit,
    });

    return {data: toJSON(types)};
  } catch (err) {
    console.error('Failed to fetch types', err);
    return {error: err.message};
  }
};

export const setDefaultType = async (id) => {
  if (!id || id === 'undefined') return;

  try {
    const type = await TaskType.findByPk(id);
    if (!type) {
      return {error: 'Type not found'};
    }

    const prevDefault = await TaskType.findOne({
      where: {isDefault: true, id: {[Op.ne]: id}},
    });
    if (prevDefault) {
      await prevDefault.update({isDefault: false});
      await prevDefault.save();
    }

    await type.update({isDefault: true});
    await type.save();

    return {success: 'Type was set as default'};
  } catch (err) {
    console.error('Failed to set default type', err);
    return {error: err.message};
  }
};

export const deleteType = async (id) => {
  if (!id || id === 'undefined') return;

  try {
    const type = await TaskType.findByPk(id);
    if (!type) {
      return {error: 'Type not found'};
    }

    await type.destroy();

    return {success: 'Type was deleted'};
  } catch (err) {
    console.error('Failed to delete type', err);
    return {error: err.message};
  }
};

export const getTypeSelectOptions = async () => {
  try {
    const types = await TaskType.findAll({
      attributes: [['id', 'value'], ['title', 'label'], ['color', 'bgColor'], 'isDefault'],
      order: [['order', 'asc']],
    });

    return {data: toJSON(types)};
  } catch (err) {
    console.error('Failed to fetch options');
    return {error: err.message};
  }
};
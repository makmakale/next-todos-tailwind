'use server';
import {dbSearchQuery, User} from '@/lib/database/sequelize';
import {Op} from 'sequelize';
import {toJSON} from '@/lib/utils/data';
import bcrypt from 'bcryptjs';
import {RegisterSchema, UpdateUserSchema} from '@/lib/form/validation';
import {revalidatePath} from "next/cache";
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants";

export const getListOfUsers = async (options = {}) => {
  const {
    limit = DEFAULT_PAGE_SIZE,
    offset = DEFAULT_PAGE_INDEX,
    q = '',
  } = options

  try {
    const users = await User.findAndCountAll({
      where: {
        name: dbSearchQuery(q),
      },
      order: ['createdAt'],
      limit,
      offset: offset * limit,
    });

    return {data: toJSON(users)};
  } catch (err) {
    console.error('Failed to fetch users', err);
    return {error: err.message};
  }
};

export const createUser = async (body) => {
  if (!body) return;

  try {
    // check if fields are valid
    const isValid = RegisterSchema.isValid(body);
    if (!isValid) {
      return {error: 'Invalid fields'};
    }

    // check if same email or username already in use
    const isUsernameExist = await User.findOne({
      where: {username: body.username},
      raw: true,
    });
    if (isUsernameExist) {
      return {error: 'Username already in use'};
    }

    const isEmailExist = await User.findOne({
      where: {email: body.email},
      raw: true,
    });
    if (isEmailExist) {
      return {error: 'Email already in use'};
    }

    if (!body.password.trim()) {
      return {error: 'Password is required'};
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({...body, password: hashedPassword});

    return {success: toJSON(user)};
  } catch (err) {
    console.error('Failed to create user', err);
    return {error: err.message};
  }
};

export const disableUser = async (id) => {
  if (!id || id === 'undefined') return;

  try {
    const user = await User.findByPk(id);
    await user.update({isActive: !user.isActive});
    await user.save();

    return {success: user.isActive ? 'User was activated' : 'User was disabled'};
  } catch (err) {
    console.error('Failed to change user status', err);
    return {error: err.message};
  }
};

export const getUserById = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const user = await User.findByPk(id)

    return {data: toJSON(user)}
  } catch (err) {
    console.error('Failed to fetch user', err)
    return {error: err.message}
  }
}

export const updateUser = async (body, id) => {
  if (!id || id === 'undefined' || !body) return

  try {
    // check if user is exists
    const user = await User.findByPk(id)
    if (!user) {
      return {error: 'User not found'}
    }

    // check if fields are valid
    const isValid = UpdateUserSchema.isValid(body)
    if (!isValid) {
      return {error: 'Invalid fields'}
    }

    // check if same email or username already in use
    const isExist = await User.findOne({
      where: {
        [Op.or]: [{username: body.username}, {email: body.email}],
        id: {[Op.ne]: id}
      }
    })
    if (isExist) {
      return {error: 'Username or Email already in use'}
    }

    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10)
      await user.update({...body, password: hashedPassword})
    } else {
      await user.update(body)
    }
    await user.save()
    revalidatePath('/users/edit/[id]', 'page')

    return {data: toJSON(user)}
  } catch (err) {
    console.error('Failed to update user')
    return {error: err.message}
  }
}
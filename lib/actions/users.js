'use server'
import {User} from '@/lib/database/sequelize'
import {toJSON} from "@/lib/data";
import bcrypt from 'bcryptjs'
import {RegisterSchema} from '@/lib/form/validation'

export const createUser = async (body) => {
  if (!body) return

  try {
    // check if fields are valid
    const isValid = RegisterSchema.isValid(body)
    if (!isValid) {
      return {error: 'Invalid fields'}
    }

    // check if same email or username already in use
    const isUsernameExist = await User.findOne({where: {username: body.username}, raw: true})
    if (isUsernameExist) {
      return {error: 'Username already in use'}
    }

    const isEmailExist = await User.findOne({where: {email: body.email}, raw: true})
    if (isEmailExist) {
      return {error: 'Email already in use'}
    }

    if (!body.password.trim()) {
      return {error: 'Password is required'}
    }
    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = await User.create({...body, password: hashedPassword})

    return {success: toJSON(user)}
  } catch (err) {
    console.error('Failed to create user')
    return {error: err.message}
  }
}
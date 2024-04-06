import {UserSchema} from '@/lib/database/models/user'

export const defineModels = (sequelize) => {
  const User = sequelize.define('user', UserSchema)

  return {
    User
  }
}

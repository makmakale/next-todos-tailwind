import {UserSchema} from '@/lib/database/models/user'
import {ProjectSchema} from "@/lib/database/models/project";

export const defineModels = (sequelize) => {
  const User = sequelize.define('user', UserSchema)
  const Project = sequelize.define('project', ProjectSchema)

  return {
    User,
    Project
  }
}

import {UserSchema} from '@/lib/database/models/user'
import {ProjectSchema} from "@/lib/database/models/project";
import {StatusSchema} from "@/lib/database/models/status";

export const defineModels = (sequelize) => {
  const User = sequelize.define('user', UserSchema)
  const Project = sequelize.define('project', ProjectSchema)
  const Status = sequelize.define('column', StatusSchema)

  return {
    User,
    Project,
    Status
  }
}

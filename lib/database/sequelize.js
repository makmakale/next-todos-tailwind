import {Op, Sequelize} from 'sequelize'
import {defineModels} from '@/lib/database/models'
import {getDefaultUsers} from '@/lib/database/models/user'
import {defaultProjects} from "@/lib/database/models/project";
import {defaultStatuses} from "@/lib/database/models/status";
import {defaultTaskTypes} from "@/lib/database/models/taskType";
import {defaultPriorities} from "@/lib/database/models/taskPriority";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: process.env.NODE_ENV === 'production'
      ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
      : {},
    logging: false,
    benchmark: true
  }
);

export const db = {
  initialized: false,
  initialize
}

const {
  User,
  Project,
  Status,
  Task,
  TaskType,
  TaskPriority
} = defineModels(sequelize)

async function initialize() {
  try {
    await sequelize.sync({alter: true})
    db.initialized = true
    console.log('Database connected successfully')

    // Create Default Users
    await bulkCreateDefaultData(User, await getDefaultUsers(), 'users')

    // Create Default Projects
    await bulkCreateDefaultData(Project, defaultProjects, 'projects')

    // Create Default Statuses
    await bulkCreateDefaultData(Status, defaultStatuses, 'statuses')

    // Create Default Task Types
    await bulkCreateDefaultData(TaskType, defaultTaskTypes, 'task types')

    // Create Default Task Priorities
    await bulkCreateDefaultData(TaskPriority, defaultPriorities, 'task types')
  } catch (err) {
    console.error(err.message)
  }
}

async function bulkCreateDefaultData(Model, data, label) {
  const count = await Model.count()

  if (!count) {
    try {
      await Model.bulkCreate(data, {validate: true})
      console.log(`Success: Default ${label} were created`)
    } catch (error) {
      console.error(`Error: Default ${label} weren't created`)
      console.log(error.message)
    }
  }
}

export const dbSearchQuery = (query) => {
  return {[Op.iLike]: `%${query}%`}
}

export {
  User,
  Project,
  Status,
  Task,
  TaskType,
  TaskPriority
}
import * as yup from 'yup';

export const LoginSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(3, 'Username should be of minimum 3 characters long')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters long')
    .required('Password is required'),
});

export const RegisterSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(3, 'Username should be of minimum 3 characters long')
    .required('Username is required'),
  name: yup
    .string('Enter your name')
    .min(3, 'Name should be of minimum 3 characters long')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Email is not valid')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters long')
    .required('Password is required'),
});

export const TaskSchema = yup.object({
  title: yup
    .string('Enter the title')
    .min(3, 'Title should be of minimum 3 characters long')
    .required('Title is required'),
  projectId: yup
    .string('Select project')
    .matches(/^[0-9]+$/)
    .required('Project is required'),
  typeId: yup
    .string('Select type')
    .matches(/^[0-9]+$/)
    .required('Type is required'),
  statusId: yup
    .string('Select status')
    .matches(/^[0-9]+$/)
    .required('Status is required'),
  createdBy: yup
    .string()
    .matches(/^[0-9]+$/)
    .required('Reporter is required'),
});

export const StatusSchema = yup.object({
  title: yup
    .string('Enter the title')
    .min(3, 'Title should be of minimum 3 characters long')
    .required('Title is required'),
  isDefault: yup.boolean(),
  addTasks: yup.boolean(),
})

export const ProjectSchema = yup.object({
  title: yup
    .string('Enter the title')
    .min(3, 'Title should be of minimum 3 characters long')
    .required('Title is required'),
  alias: yup
    .string('Enter the alias')
    .min(2, 'Alias should be of minimum 2 characters long')
    .max(6, 'Alias should be of maximum 6 characters long')
    .required('Alias is required. It will be shown on the board')
})
import * as yup from 'yup'

export const LoginSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(3, 'Username should be of minimum 3 characters long')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters long')
    .required('Password is required')
})

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
})

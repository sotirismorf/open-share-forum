import {
  getUser,
  newUser,
} from '../controllers/user.controller'

export const userRoutes = [
  {
    path: '/user',
    method: 'get',
    action: getUser,
  },
  {
    path: '/user',
    method: 'post',
    action: newUser,
  },
]

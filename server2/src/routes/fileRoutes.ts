import {
  getFiles,
  newFile,
} from '../controllers/fileControllers'

export const fileRoutes = [
  {
    path: '/file',
    method: 'get',
    action: getFiles,
  },
  {
    path: '/file',
    method: 'post',
    action: newFile,
  },
]

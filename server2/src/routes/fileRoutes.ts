import {
  getFiles,
  newFile,
  downloadFile,
} from '../controllers/file.controller'

export const fileRoutes = [
  {
    path: '/file',
    method: 'get',
    action: getFiles,
  },
  {
    path: '/download',
    method: 'get',
    action: downloadFile,
  },
  {
    path: '/file',
    method: 'post',
    action: newFile,
  },
]

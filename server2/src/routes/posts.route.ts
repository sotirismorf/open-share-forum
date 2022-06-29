import {
  getPost,
  newPost
} from '../controllers/post.controller'

import {
  getComment,
  newComment
} from '../controllers/comment.controller'

export const postRoutes = [
  {
    path: '/posts',
    method: 'get',
    action: getPost,
  },
  {
    path: '/posts',
    method: 'post',
    action: newPost,
  },
  {
    path: '/comments',
    method: 'post',
    action: getComment,
  },
  {
    path: '/comments',
    method: 'post',
    action: newComment,
  },
]

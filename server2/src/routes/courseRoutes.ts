import {
  getAllCourses,
  getCourse,
  getCourseBySemester,
  newCourse,
} from '../controllers/courseControllers'

export const appRoutes = [
  {
    path: '/courses',
    method: 'get',
    action: getAllCourses,
  },
  {
    path: '/courses/:id',
    method: 'get',
    action: getCourse,
  },
  {
    path: '/courses/semester/:semester',
    method: 'get',
    action: getCourseBySemester,
  },
  {
    path: '/courses',
    method: 'post',
    action: newCourse,
  },
]

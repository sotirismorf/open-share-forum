import { Request, Response } from 'express'
import { AppDataSource } from '../AppDataSource'
import { Course } from '../entities/Course'

export async function getAllCourses(request: Response, response: Response) {
  const data = await AppDataSource.getRepository(Course).find()
  response.send(data)
}

export async function getCourse(request: Request, response: Response) {
  AppDataSource.getRepository(Course)
    .find({
      where: {
        id: parseInt(request.params.id),
      },
    })
    .then((data) => {
      response.send(data)
    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(400)
    })
}

export async function getCourseBySemester(
  request: Request,
  response: Response
) {
  AppDataSource.getRepository(Course)
    .find({
      where: {
        semester: parseInt(request.params.semester),
      },
    })
    .then((data) => {
      response.send(data)
    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(400)
    })
}

export async function newCourse(request: Request, response: Response) {
  const courseRepository = AppDataSource.getRepository(Course)

  try {
    const course = courseRepository.create(request.body)
    courseRepository.save(course)
    response.send(course)
  } catch (err) {
    console.log(err)
    response.sendStatus(400)
  }
}

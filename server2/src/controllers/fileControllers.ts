import { Request, Response } from 'express'
import { AppDataSource } from '../AppDataSource'
import { Course } from '../entities/Course'
import { File } from '../entities/File'

export async function getFile(request: Response, response: Response) {
  const data = await AppDataSource.getRepository(File).find()
  response.send(data)
}

export async function getFiles(request: Request, response: Response) {
  console.log(request.query)
  AppDataSource.getRepository(File)
    .find({
      relations: {
        course: true
      },
      where: request.query,
    })
    .then((data) => {
      response.send(data)
    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(400)
    })
}

export async function newFile(request: Request, response: Response) {
  const repository = AppDataSource.getRepository(File)
  console.log(request.body)

  try {
    const file = repository.create(JSON.parse(request.body.document))
    console.log(file)

    const item = file[0]

    if (!request.files) {
      throw 'Missing file'
    }

    if (
      item.exams === undefined ||
      item.course === undefined ||
      item.semester === undefined ||
      item.exams === undefined ||
      item.exam_year === undefined ||
      item.filename === undefined ||
      item.has_solutions === undefined
    ) { throw 'Missing Property'}

    repository.save(file)
    response.send(file)
  } catch (err) {
    console.log(err)
    response.sendStatus(400)
  }
}

import { Request, Response } from 'express'
import { AppDataSource } from '../AppDataSource'
import { User } from '../entities/User'

export async function getUser(request: Response, response: Response) {
  const data = await AppDataSource.getRepository(User).find()
  response.send(data)
}

export async function getFiles(request: Request, response: Response) {
  console.log(request.query)
  AppDataSource.getRepository(User)
    .find({
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

export async function newUser(request: Request, response: Response) {
  const repository = AppDataSource.getRepository(User)

  try {
    const file = repository.create(request.body)
    console.log(file)

    const item = file[0]

    if (
      item.username === undefined ||
      item.email === undefined ||
      item.handle === undefined ||
      item.posts === undefined ||
      item.online === undefined
    ) { throw 'Missing Property'}

    repository.save(file)
    response.send(file)
  } catch (err) {
    console.log(err)
    response.sendStatus(400)
  }
}

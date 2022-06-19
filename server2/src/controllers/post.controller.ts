import { Request, Response } from 'express'
import { AppDataSource } from '../AppDataSource'
import { Post } from '../entities/Post'

export async function getPost(request: Request, response: Response) {
  AppDataSource.getRepository(Post)
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

export async function newPost(request: Request, response: Response) {
  const repository = AppDataSource.getRepository(Post)

  try {
    const item = repository.create(request.body)
    repository.save(item)
    response.send(item)
  } catch (err) {
    console.log(err)
    response.sendStatus(400)
  }
}

import { Request, Response } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Post } from '../entities/Post';
import { User } from '../entities/User';

export async function getPost(request: Request, response: Response) {
  AppDataSource.getRepository(Post)
    .find({
      where: request.query,
      relations: {
        user: true,
      }
    })
    .then((data) => {
      //console.log(data)
      response.send(data);
    })
    .catch((err) => {
      //console.log(err)
      console.log('There was an error');
      response.sendStatus(400);
    });
}

export async function newPost(request: Request, response: Response) {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const user = await userRepository.findOne({
      where: {
        id: request.body.author,
      },
    });

    console.log(user)

    const post = new Post()
    post.title = request.body.title
    post.body = request.body.body
    post.user = user

    console.log(post)

    AppDataSource.manager.save(post)

    response.send(post);
  } catch (err) {
    console.log(err);
    response.sendStatus(400);
  }
}

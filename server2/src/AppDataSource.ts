import { DataSource } from 'typeorm'
import { Course } from './entities/Course'
import { File } from './entities/File'
import { Post } from './entities/Post'
import { User } from './entities/User'
import { Comment } from './entities/comment.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'posgres',
  database: 'thmmy',
  entities: [Course, File, Post, User, Comment]
})

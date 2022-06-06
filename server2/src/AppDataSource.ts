import { DataSource } from 'typeorm'
import { Course } from './entities/Course'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'posgres',
  database: 'thmmy',
  entities: [Course]
})

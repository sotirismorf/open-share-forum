import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { Course } from './Course'
import { User } from './User'

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'date' })
  posted: Date

  @Column()
  filename: string

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  semester: number

  @Column()
  exams: boolean

  @Column()
  exam_year: number

  @Column()
  exam_period: number

  @Column()
  has_solutions: boolean
}

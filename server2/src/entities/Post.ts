import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { User } from './User'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'date' })
  created: Date

  @Column({ unique: true })
  body: string

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User
}

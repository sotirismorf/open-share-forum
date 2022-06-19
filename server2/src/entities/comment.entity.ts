import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { User } from './User'
import { Post } from './Post'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'date' })
  created: Date

  @Column({ unique: true })
  body: string

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Post, post => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post
}

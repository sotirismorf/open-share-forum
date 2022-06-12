import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm'

import { Post } from './Post'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'date' })
  account_created: Date

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  handle: string

  @Column()
  online: boolean

  @OneToMany(() => Post, post => post.user)
  //@JoinColumn({ name: 'post_id' })
  posts: Post[]
}

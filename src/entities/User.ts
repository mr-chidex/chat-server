import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { Chat } from './Chat';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', {
    unique: true,
    nullable: true,
  })
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('text', { nullable: true })
  token: string;

  @OneToMany(() => Chat, (chat) => chat.user, { cascade: true })
  messages: Chat[];

  @Column('text', { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Column('text', { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;
}

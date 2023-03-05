import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config';
import { Chat } from './entities/Chat';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB_HOST,
  port: 5432,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Chat],
  migrations: [],
  subscribers: [],
});

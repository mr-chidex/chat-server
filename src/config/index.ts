import 'dotenv/config';

const config = {
  API_VERSION: process.env.API_VERSION!,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV!,
  DB_HOST: process.env.DB_HOST!,
  DB_USER: process.env.DB_USER!,
  DB_NAME: process.env.DB_NAME!,
  DB_PASS: process.env.DB_PASS!,
};

export default config;

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

const nodeEnv = process.env.NODE_ENV;

const env =
  nodeEnv === 'prod' ? '.env' : nodeEnv === 'stag' ? '.stag.env' : '.dev.env';

dotenv.config({
  path: join(process.cwd(), env),
});

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  entities: ['src/entities/**/*.ts'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
};

const isSslConnection =
  process.env.DB_REJECTUNAUTHORIZED == 'true' ? true : false;
if (isSslConnection) {
  config['ssl'] = {
    rejectUnauthorized: false,
  };
}

export default config;
export const dataSource = new DataSource(config);

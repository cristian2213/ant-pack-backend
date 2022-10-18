import { registerAs } from '@nestjs/config';

const config = registerAs('config', () => {
  return {
    pgDb: {
      DB_DIALECT: process.env.DB_DIALECT,
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_PASS: process.env.DB_PASS,
      DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE,
      DB_AUTOLOAD_ENTITIES: process.env.DB_AUTOLOAD_ENTITIES,
      DB_REJECTUNAUTHORIZED: process.env.DB_REJECTUNAUTHORIZED,
    },
  };
});

export { config };

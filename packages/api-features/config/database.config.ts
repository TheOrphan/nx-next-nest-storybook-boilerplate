import {
  DatabaseConfigTypes,
  DatabaseProviderTypes,
} from './configrutation.types';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): DatabaseConfigTypes => ({
    type: process.env.DB_TYPE as DatabaseProviderTypes,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })
);

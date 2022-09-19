import { AppConfigTypes } from './configrutation.types';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): AppConfigTypes => ({
    mode: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'The app',
    port: parseInt(process.env.PORT, 10) || 5001,
    prefix: process.env.PREFIX || 'api',
    version: process.env.VERSION || 'latest',
  })
);

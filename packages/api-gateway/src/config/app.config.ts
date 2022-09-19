import { AppConfigTypes } from './configrutation.types';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): AppConfigTypes => ({
    mode: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'The app',
    port: parseInt(process.env.PORT, 10) || 5000,
    version: process.env.VERSION || 'latest',
    prefix: process.env.GLOBAL_PREFIX || 'api',
    features_service: process.env.API_FEATURE,
  })
);

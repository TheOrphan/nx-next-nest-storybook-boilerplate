import { AppConfigTypes } from './configrutation.types';
import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs(
  'app',
  (): AppConfigTypes => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    prefix: process.env.GLOBAL_PREFIX || 'api',
    features_service: {
      host: process.env.FEATURES_API_HOST,
      port: process.env.FEATURES_API_PORT,
      prefix: process.env.FEATURES_API_PREFIX,
    },
  })
);

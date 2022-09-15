import { AppConfigTypes } from './configrutation.types';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): AppConfigTypes => ({
    port: parseInt(process.env.PORT, 10) || 3000,
  })
);

import { DocumentBuilder } from '@nestjs/swagger';

const moduleName = 'API Health Check';
const swaggerName = `${process.env.APP_NAME} - ${moduleName}`;

export const swagHealth = new DocumentBuilder()
  .setTitle(swaggerName)
  .setDescription(`API description for ${swaggerName}`)
  .setVersion(process.env.VERSION)
  .addTag('Health')
  .build();

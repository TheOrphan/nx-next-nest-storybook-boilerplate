import { DocumentBuilder } from '@nestjs/swagger';

const moduleName = 'API Release';
const swaggerName = `${process.env.APP_NAME} - ${moduleName}`;

export const swagRelease = new DocumentBuilder()
  .setTitle(swaggerName)
  .setDescription(`API description for ${swaggerName}`)
  .setVersion(process.env.VERSION)
  .addTag('Release')
  .build();

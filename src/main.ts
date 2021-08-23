import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .addServer("http://localhost:3000","local service")
  .setTitle('API de Teste')
  .setDescription('Api de tasks')
  .setVersion('1.0')
  .addBearerAuth()
  .build(); 
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT);
}
bootstrap();

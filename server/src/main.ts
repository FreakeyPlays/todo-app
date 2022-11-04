import { NestFactory } from '@nestjs/core'
import { DocumentBuilder } from '@nestjs/swagger'
import { SwaggerModule } from '@nestjs/swagger/dist'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Documentation to the Todo API.')
    .setVersion('1.0')
    .addTag('todo')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.enableCors({ origin: '*' })
  await app.listen(parseInt(process.env.SERVER_PORT) || 3000)
}
bootstrap()

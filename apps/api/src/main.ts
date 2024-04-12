import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.enableCors({
    origin: configService.get('UI_HOST'),
    allowedHeaders: 'Content-Type, Accept, X-Device-ID'
  })

  await app.listen(parseInt(configService.get('API_PORT') || '6287'))
}
bootstrap()

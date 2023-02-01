import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (e) => {
        console.error(e);
        throw new BadRequestException('You shall not pass!');
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT ?? 3000;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages:
          process.env.NODE_ENV === 'PRODUCTION' ? true : false,
      }),
    );
    await app.listen(PORT, () =>
      console.log(`Server running. Use our API on port: ${PORT}`),
    );
  } catch (e) {
    console.log(`Server not running. Error: ${e.message}`);
  }
};
start();

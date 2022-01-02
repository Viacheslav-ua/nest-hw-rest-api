import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT ?? 3000;
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () =>
      console.log(`Server running. Use our API on port: ${PORT}`),
    );
  } catch (e) {
    console.log(`Server not running. Error: ${e.message}`);
  }
};
start();

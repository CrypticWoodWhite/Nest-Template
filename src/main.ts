import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app/app.module';

async function bootstrap() {
    // Init default express settings
    const app = await NestFactory.create(AppModule);
    // Setup MVC with ejs
    app.useStaticAssets(join(__dirname, '..', 'public'));
    // Start server
    await app.listen(3000);
}
bootstrap();

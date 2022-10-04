import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [config.get("NATS_URI")]
    }
  })

  await app.startAllMicroservices()

  await app.listen(3700);
  console.log("server is running on port 3700")
}
bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './models/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ClientsModule.register([
      {
        name: 'user_service',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URI]
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

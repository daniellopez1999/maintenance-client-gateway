import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_MICROSERVICE } from 'src/config/services';
import { envs } from 'src/config';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: USERS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.USERS_MICROSERVICE_HOST,
          port: envs.USERS_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
})
export class UsersModule {}

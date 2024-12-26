import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GetUsersDto } from './dto/get-users.dto';
import { USERS_MICROSERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { envs } from 'src/config';
import { catchError, firstValueFrom } from 'rxjs';
import { RpcCustomExceptionFilter } from 'src/common/exceptions/rpc-exception.filter';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_MICROSERVICE) private readonly usersClient: ClientProxy,
  ) {}

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send({ cmd: 'create_user' }, createUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post()
  confirmPassword() {
    return 'Confirm Password';
  }

  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'get-user' }, id).pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      ),
    );
  }

  @Get('get-users')
  getUsers(@Query() params: GetUsersDto) {
    return this.usersClient
      .send(
        { cmd: 'get-users' },
        { page: params.page, limit: params.limit, search: params.search },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}

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
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { envs } from 'src/config';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_MICROSERVICE) private readonly usersClient: ClientProxy,
  ) {}

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersClient.send({ cmd: 'create_user' }, createUserDto);
    } catch (error) {
      Logger.error('Error creating user', error);
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  confirmPassword() {
    return 'Confirm Password';
  }

  @Get('get-users')
  getUsers(@Query() params: GetUsersDto) {
    Logger.log(params);
    return this.usersClient.send(
      { cmd: 'get-users' },
      { page: params.page, limit: params.limit, search: params.search },
    );
  }
}

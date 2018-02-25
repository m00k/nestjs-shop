import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userSvc: UserService) { }

  @Get()
  async all(): Promise<User[]> {
    return this.userSvc.all();
  }

  @HttpCode(204)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.userSvc.create(createUserDto);
  }

  @Get(':id')
  async get(@Param() params): Promise<User> {
    return this.userSvc.get(parseInt(params.id, 10));
  }

  @HttpCode(204)
  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    // TODO (cb): exception handling
    this.userSvc.update(updateUserDto); 
  }
}
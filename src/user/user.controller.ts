import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, HttpException } from '@nestjs/common';
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
    try {
      this.userSvc.update(updateUserDto); 
    } catch (e) {
      if (e instanceof RangeError) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
  }
}

// user = {fn:'John', ln:'Doe', dob: new Date('January 11, 1990')};
// post = () => fetch( 'http://localhost:3000/users/', { body: JSON.stringify(user), method: 'POST', headers: {
//  'content-type': 'application/json'
// }, }).then(_ => console.log(_))
//
// PUT
//
// put = (id) => fetch( 'http://localhost:3000/users/', { body: JSON.stringify({...user, id, fn: 'Jane'}), method: 'PUT', headers: {
//       'content-type': 'application/json'
//     }, }).then(_ => console.log(_))
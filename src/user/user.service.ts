import { Component } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Component()
export class UserService {
  private users: User[] = [];
  private id = 0;

  all(): User[] {
    return this.users.slice();
  }

  create(createUserDto: CreateUserDto): void {
    const user: User = { ...createUserDto, id: ++this.id };
    this.users.push(user);
  }

  get(id: number): User | null {
    return this.users.slice().find(_ => _.id === id);
  }

  update(user: User): void {
    const idx = this.users.findIndex(_ => _.id === user.id);
    if (idx === -1) throw new Error(`No user with id ${user.id}`);
    this.users = [...this.users.slice(0, idx), user, ...this.users.slice(idx)];
  }
}

// user = {fn:'John', ln:'Doe', dob: new Date('January 11, 1990')};
// fetch( 'http://localhost:3000/users/', { body: JSON.stringify(user), method: 'POST', headers: {
//  'content-type': 'application/json'
// }, }).then(_ => console.log(_))
// fetch( 'http://localhost:3000/users/', { body: JSON.stringify({...user, id: 1, fn: 'Jane'}), method: 'PUT', headers: {
//       'content-type': 'application/json'
//     }, }).then(_ => console.log(_))
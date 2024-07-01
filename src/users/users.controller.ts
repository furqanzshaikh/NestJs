import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService, User } from './users.service';

interface CreateUserDto {
  name: string;
  email: string;
}

interface UpdateUserDto {
  name: string;
  email: string;
}

@Controller('/api/users')
export class UsersController {
  constructor(private readonly appService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.appService.getUsers();
  }

  @Post('/create')
  addUser(@Body() createUserDto: CreateUserDto): User {
    const { name, email } = createUserDto;
    return this.appService.addUser(name, email);
  }

  @Put('/update/:id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): User {
    console.log(`Controller: Updating user with id: ${id}, data:`);
    const { name, email } = updateUserDto;
    return this.appService.updateUser(Number(id), name, email);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string): User {
    const userId = Number(id);
    console.log(`Controller: Received request to delete user with id: ${userId}`);
    return this.appService.deleteUser(userId);
  }
}

import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  getUsers(): User[] {
    return this.users;
  }

  addUser(name: string, email: string): User {
    const newUser: User = { id: this.idCounter++, name, email };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, name: string, email: string): User {
    console.log(`Service: Updating user with id: ${id}, name: ${name}, email: ${email}`);
    const user = this.users.find(user => user.id === id);
    if (!user) {
      console.log('Service: User not found');
      return null;
    }
    user.name = name;
    user.email = email;
    console.log('Service: Updated user:', user);
    return user;
  }

  deleteUser(id: number): User {
    console.log(`Service: Deleting user with id: ${id}`);
    console.log('Service: Current users:', this.users);

    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      console.log('Service: User not found');
      return null;
    }

    const [deletedUser] = this.users.splice(index, 1);
    console.log('Service: Deleted user:', deletedUser);
    return deletedUser;
  }
}

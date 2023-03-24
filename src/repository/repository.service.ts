import { Injectable } from '@nestjs/common';
import { User } from './types/User';
import { uuid } from 'uuidv4';

@Injectable()
export class RepositoryService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: uuid(),
        name: 'John Doe',
        email: 'test@test.com',
        isAdmin: true,
      },
    ];
  }

  public getUsers(isAdmin?: boolean): User[] {
    if (isAdmin !== undefined) {
      return this.users.filter((user) => user.isAdmin === isAdmin);
    }

    return this.users;
  }

  public getUserById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  public createUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      id: uuid(),
    };

    this.users.push(newUser);

    return newUser;
  }

  public updateUser(id: string, email: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }

    this.users[userIndex].email = email;
    return;
  }

  public deleteUser(id: string): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const user = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return user;
  }
}

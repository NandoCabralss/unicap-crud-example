import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserCreateBody } from './dto/user-create-body';
import { UserUpdateBody } from './dto/user-update-body';
import { RepositoryService } from './repository/repository.service';
import { User } from './repository/types/User';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly repositoryService: RepositoryService,
  ) {}

  @Get('users/:isAdmin')
  getUsers(@Param('isAdmin', ParseBoolPipe) isAdmin: boolean): User[] {
    return this.repositoryService.getUsers(isAdmin);
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string): User | undefined {
    try {
      return this.repositoryService.getUserById(id);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Post('user')
  createUser(@Body() user: UserCreateBody): void {
    this.repositoryService.createUser(user);
    return;
  }

  @Patch('user')
  updateUser(@Body() body: UserUpdateBody): void {
    const { email, id } = body;

    return this.repositoryService.updateUser(id, email);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string): User | undefined {
    return this.repositoryService.deleteUser(id);
  }
}

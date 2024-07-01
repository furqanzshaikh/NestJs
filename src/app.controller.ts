import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

interface CreateTodoDto {
  title: string;
  description: string;
}

interface UpdateTodoDto {
  title: string;
  description: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/todos')
  getTodos() {
    return this.appService.getTodos();
  }

  @Post('/api/todos/create')
  addTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.appService.addTodo(createTodoDto.title, createTodoDto.description);
  }

  @Put('/api/todos/update/:id')
  updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.appService.updateTodo(Number(id), updateTodoDto.title, updateTodoDto.description);
  }

  @Delete('/api/todos/delete/:id')
  deleteTodo(@Param('id') id: number) {
    return this.appService.deleteTodo(Number(id));
  }
}

import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  description: string;
}

@Injectable()
export class AppService {
  private todos: Todo[] = [];
  private idCounter = 1;

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string, description: string): Todo {
    const newTodo: Todo = { id: this.idCounter++, title, description };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: number, title: string, description: string): Todo {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) {
      return null;
    }
    todo.title = title;
    todo.description = description;
    return todo;
  }

  deleteTodo(id: number): Todo {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      return null;
    }
    const [deletedTodo] = this.todos.splice(index, 1);
    return deletedTodo;
  }
}

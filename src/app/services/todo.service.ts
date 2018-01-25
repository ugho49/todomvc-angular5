import { Injectable } from '@angular/core';
import {Todo} from '../models/todo';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class TodoService {

  private todoList: BehaviorSubject<Todo[]> = new BehaviorSubject([]);
  private readonly LSKEY_TODO = 'todo-list';

  constructor() {
    const todos = JSON.parse(window.localStorage.getItem(this.LSKEY_TODO)) || []
    this.todoList.next(todos);
    this.todoList.subscribe(() => {
      this.refreshLocalStorage();
    });
  }

  getAllTodos(): Todo[] {
    return this.todoList.getValue().slice(0);
  }

  addTodo(todo: Todo): void {
    const todos = this.getAllTodos();
    todos.push(todo);
    this.todoList.next(todos);
  }

  editTodo(id, content): void {
    const todos = this.getAllTodos();

    todos.forEach(t => {
      if (t.id === id) {
        t.content = content;
      }
    });

    this.todoList.next(todos);
  }

  removeTodo(id): void {
    const todos = this.getAllTodos().filter(t => t.id !== id);
    this.todoList.next(todos);
  }

  clearAllCompleted(): void {
    const todos = this.getAllTodos().filter(t => !t.checked);
    this.todoList.next(todos);
  }

  toggleTodo(id): void {
    const todos = this.getAllTodos();
    todos.forEach(t => {
      if (t.id === id) {
        t.checked = !t.checked;
      }
    });
    this.todoList.next(todos);
  }

  setCheckForAllTodo(check: boolean): void {
    const todos = this.getAllTodos();
    todos.forEach(t => {
      t.checked = check;
    });
    this.todoList.next(todos);
  }

  refreshLocalStorage(): void {
    window.localStorage.setItem(this.LSKEY_TODO, JSON.stringify(this.getAllTodos()));
  }

}

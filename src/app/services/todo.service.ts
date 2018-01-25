import { Injectable } from '@angular/core';
import {Todo} from '../models/todo';

@Injectable()
export class TodoService {

  private readonly LSKEY_TODO = 'todo-list';
  private todoList: Todo[];

  constructor() {
    this.todoList = JSON.parse(window.localStorage.getItem(this.LSKEY_TODO)) || [];
  }

  addTodo(todo: Todo): void {
    this.todoList.push(todo);
    this.refreshStorage();
  }

  editTodo(id, content): void {
    this.todoList.forEach(t => {
      if (t.id === id) {
        t.content = content;
      }
    });
    this.refreshStorage();
  }

  removeTodo(id): void {
    this.todoList = this.todoList.filter(t => t.id !== id);
    this.refreshStorage();
  }

  getAllTodos(): Todo[] {
    return this.todoList.slice(0);
  }

  clearAllCompleted(): void {
    this.todoList = this.todoList.filter(t => !t.checked);
    this.refreshStorage();
  }

  toggleTodo(id): void {
    this.todoList.forEach(t => {
      if (t.id === id) {
        t.checked = !t.checked;
      }
    });

    this.refreshStorage();
  }

  setCheckForAllTodo(check: boolean): void {
    this.todoList.forEach(t => {
      t.checked = check;
    });

    this.refreshStorage();
  }

  refreshStorage(): void {
    window.localStorage.setItem(this.LSKEY_TODO, JSON.stringify(this.todoList));
  }

}

import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../models/todo';
import {FilterEnum} from '../../models/filter.enum';

@Component({
  selector: 'app-todos-home',
  templateUrl: './todos-home.component.html',
  styleUrls: ['./todos-home.component.scss']
})
export class TodosHomeComponent implements OnInit {

  filterEnum = FilterEnum;
  todoFilter: FilterEnum;
  newTodoInputValue: string;
  todos: Todo[] = [];
  allItemChecked = false;
  uncheckItems = 0;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos();
    this.todoFilter = this.filterEnum.ALL;
    this.verifyAllItemsChecked();
  }

  addTodo() {
    const todo =  new Todo();
    todo.content = this.newTodoInputValue;

    this.todoService.addTodo(todo);
    this.todos.push(todo);
    this.newTodoInputValue = '';
    this.verifyAllItemsChecked();
  }

  onTodoChange(newContent, todo: Todo) {
    this.todoService.editTodo(todo.id, newContent);
    this.verifyAllItemsChecked();
  }

  onTodoToggle(todo: Todo) {
    this.todoService.toggleTodo(todo.id);
    this.verifyAllItemsChecked();
  }

  onRemoveBtnClicked(todo: Todo) {
    this.todoService.removeTodo(todo.id);
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.verifyAllItemsChecked();
  }

  clearCompleted() {
    this.todoService.clearAllCompleted();
    this.todos = this.todos.filter(t => !t.checked);
    this.verifyAllItemsChecked();
  }

  toggleAllTodo() {
    this.todoService.setCheckForAllTodo(!this.allItemChecked);
    this.verifyAllItemsChecked();
  }

  verifyAllItemsChecked() {
    this.uncheckItems = 0;
    this.allItemChecked = true;

    this.todos.map((t) => {
      if (!t.checked) {
        this.allItemChecked = false;
        this.uncheckItems++;
      }
    });
  }
}

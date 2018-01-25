import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  @Input() todo: Todo;
  @Output('OnChange') changeEvent = new EventEmitter<string>();
  @Output('OnToggle') toggleEvent = new EventEmitter<void>();
  @Output('OnRemoveBtnClicked') removeEvent = new EventEmitter<void>();

  editing = false;
  newValueTodo = '';

  removeTodo() {
    this.removeEvent.emit();
  }

  toggleTodo() {
    this.toggleEvent.emit();
  }

  startEditing(element: HTMLInputElement) {
    this.editing = true;
    this.newValueTodo = this.todo.content;
    setTimeout(() => { element.focus(); }, 0);
  }

  commitEdit() {
    if (!this.editing) {
      return;
    }

    this.editing = false;
    this.changeEvent.emit(this.newValueTodo);
  }

  cancelEdit() {
    this.editing = false;
  }
}

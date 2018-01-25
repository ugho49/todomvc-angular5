import { v4 as uuidv4 } from 'uuid';

export class Todo {

  public id: string;
  public content: string;
  public checked: boolean;

  constructor() {
    this.id = uuidv4();
    this.content = '';
    this.checked = false;
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import {TodoService} from './services/todo.service';
import { TodoComponent } from './components/todo/todo.component';
import { TodosHomeComponent } from './components/todos-home/todos-home.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodosHomeComponent,
    FilterPipe
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.required,
      ])]
    });

    this.load();
  }

  clear() {
    this.form.reset();
  }

  add() {
    const id = this.todos.length + 1;
    const title = this.form.controls['title'].value;

    this.todos.push(new Todo(id, title, false));
    
    this.save();
    this.clear();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todos.splice(index, 1);
    }

    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;

    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;

    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    
    if (data) {
      this.todos = JSON.parse(data);
    }
  }

  changeMode(mode: String) {
    this.mode = mode;
  }
}

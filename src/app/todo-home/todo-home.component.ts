import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../common/dialog/dialog.component';
import { Todo } from '../common/Todo';

@Component({
  selector: 'todo-home',
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.css']
})
export class TodoHomeComponent implements OnInit {

  todo: any;
  todos: Array<any> = [];

  constructor(private dataService: DataService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTodos();
  }

  openDialog(todoData: any) {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, { data: todoData });
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.getTodos();
        return;
      } else {
        if (result.upData.text === '') {
          this.snackBar.open('Empty todo!', 'Okay!', {duration: 3000});
          this.getTodos();
          return;
        } else {
          let todoObj: Todo;
          if (result.upData._id === '' || result.upData._id === undefined || result.upData._id === null || result.upData._id === 0) {
            todoObj = new Todo('', result.upData.text, result.upData.isCompleted);
            this.saveTodo(todoObj);
          } else {
            todoObj = new Todo(result.upData._id, result.upData.text, result.upData.isCompleted);
            this.updateTodo(todoObj);
          }
        }
      }
    });
  }

  onCheckTodo(val: any, todo: any) {
    todo.isCompleted = val.checked;
    this.updateTodo(todo);
  }

  getTodos() {
    this.dataService.getTodos().subscribe(
      todos => {
        this.todos = todos;
      },
      error => {
        this.snackBar.open(error, 'Okay', {duration: 3000});
      }
    );
  }

  getTodo() {
    let id = '5a841813f36d2873fcce99c7';
    this.dataService.getTodo(id).subscribe(
      todos => {
        this.todo = todos;
      },
      error => {
        this.snackBar.open(error, 'Okay', {duration: 3000});
      }
    );
  }

  saveTodo(todo: Todo) {
    let todoObj = {
      "text": todo.text,
      "isCompleted": todo.isCompleted
    };
    this.dataService.saveTodo(todoObj).subscribe(
      data => {
        this.snackBar.open(todoObj.text + ' Saved!', 'Done', {duration: 3000});
        this.getTodos();
      },
      error => {
        this.snackBar.open(error, 'Okay', {duration: 3000});
      }
    );
  }

  updateTodo(todo: any) {
    let id = todo._id;
    let updatedObj = {
      "text": todo['text'],
      "isCompleted": todo['isCompleted']
    };
    this.dataService.updateTodo(updatedObj, id).subscribe(
      data => {
        this.snackBar.open(todo.text + ' updated!', 'Done', {duration: 3000});
        this.getTodos();
      },
      error => {
        this.snackBar.open(error, 'Okay', {duration: 3000});
      }
    );
  }

  deleteTodo(id: string) {
    this.dataService.deleteTodo(id).subscribe(
      data => {
        this.snackBar.open('Deleted.', 'Okay', {duration: 3000});
        this.getTodos();
      },
      error => {
        this.snackBar.open(error, 'Okay', {duration: 3000});
      }
    );
  }

}

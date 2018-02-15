import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../common/dialog/dialog.component';

@Component({
  selector: 'todo-home',
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.css']
})
export class TodoHomeComponent implements OnInit {

  todo: any;
  todos: Array<any> = [];

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getTodos();
    // this.getTodo();
    // this.saveTodo();
    // this.updateTodo();
    // this.deleteTodo();
  }

  openDialog(obj: any) {
    console.log(obj);
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {data: obj});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result === undefined || result.data.text === result.upData) {
        console.log('Error');
      } else {
        let todoObj = {
          "_id": result.data._id,
          "text": result.upData,
          "isCompleted": result.data.isCompleted
        };
        this.updateTodo(todoObj);
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
        console.log('Error in fetching todos');
      }
    );
  }

  getTodo() {
    let id = '5a841813f36d2873fcce99c7';
    this.dataService.getTodo(id).subscribe(
      todos => {
        this.todo = todos;
        console.log(todos);
      },
      error => {
        console.log('Error in fetching todo');
      }
    );
  }

  saveTodo() {
    // Sample todo JSON.
    let todo = {
      "text": "Work on mean at 8",
      "isCompleted": false
    };
    this.dataService.saveTodo(todo).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
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
        console.log(data)
        this.getTodos();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTodo() {
    let id = '5a84967e34efdb8bf480597c';
    this.dataService.deleteTodo(id).subscribe(
      data => {
        console.log(data);
        this.getTodos();
      },
      error => {
        console.log(error);
      }
    );
  }

}

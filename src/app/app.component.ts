import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todo: any;
  todos: Array<any> = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getTodos();
    this.getTodo();
    // this.saveTodo();
    // this.updateTodo();
    // this.deleteTodo();
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
      "text": "Cycling at 7.",
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

  updateTodo() {
    let id = '5a84179bf36d2873fcce99aa';
    let todo = {
      "text": "Order Lasagna at 1pm.",
      "isCompleted": false
    };
    this.dataService.updateTodo(todo, id).subscribe(
      data => {
        console.log(data)
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
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }

}

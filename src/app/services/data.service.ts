import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  result: any;
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getTodos(): Observable<any> {
    return this.http.get('/api/todos/')
      .map(result => {
        console.log(result.json().data);
        return this.result = result.json().data;
      });
  }

  getTodo(id: string): Observable<any> {
    return this.http.get('/api/todo/' + id)
      .map(result => {
        console.log(result.json());
        return this.result = result.json().data;
      });
  }

  saveTodo(todo: any) {
    return this.http.post('/api/saveTodo/', todo, this.options)
      .map(result => {
        console.log(result.json());
        return this.result = result;
      });
  }

  updateTodo(todo: any, id: string) {
    return this.http.put('/api/updateTodo/' + id, todo, this.options)
      .map(result => {
        console.log(result.json());
        return this.result = result;
      });
  }

  deleteTodo(id: string) {
    return this.http.delete('/api/deleteTodo/' + id)
      .map(result => {
        console.log(result.json());
        return this.result = result;
      })
  }

}

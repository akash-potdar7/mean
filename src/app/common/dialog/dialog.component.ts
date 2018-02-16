import { Component, OnInit, Inject, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'
import { DataService } from '../../services/data.service';
import { Todo } from '../Todo';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  dialogTitle: string;
  obj: Todo = new Todo('', '', false);
  placeholder: string;

  btnToggler: boolean = false;

  todoTextFormControl = new FormControl('', [ Validators.required ]);

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogComponent>, private dataService: DataService) { }

  ngOnInit() {
    let type = this.data.type;
    switch (type) {
      case 'update':
        this.dialogTitle = 'Edit Todo';
        this.obj = this.data['data'];
        this.placeholder = 'Edit you ToDo';
        this.btnToggler = false;
        break;
      case 'add':
        this.dialogTitle = 'Add Todo';
        this.placeholder = 'Enter ToDo';
        this.obj.isCompleted = false;
        this.btnToggler = true;
        break;
      default:
        break;
    }
  }

  validateBtn(text: string) {
    if(text.length > 0 &&  text !== '' || text !== null || text !== undefined) {
      this.btnToggler = false;
    } else this.btnToggler = true;
  }

  getErrorMessage() {
    if(this.todoTextFormControl.hasError('required')) {
      this.btnToggler = true;
      return 'You must enter a value';
    } else {
      this.btnToggler = false;
    }
  }

  onNoClick() {
    this.todoTextFormControl.markAsUntouched();
    this.todoTextFormControl.setErrors(null);
    this.dialogRef.close();
  }

}

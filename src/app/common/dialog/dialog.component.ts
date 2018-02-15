import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  updatedTitle: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogComponent>, private dataService: DataService) { }

  ngOnInit() {
  }

  /* updateTodo(updatedTitle: string) {
    console.log(updatedTitle);
    debugger
    this.dialogRef.close();
  } */

  onNoClick() {
    this.dialogRef.close();
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { TodoNavbarComponent } from './todo-navbar/todo-navbar.component';
import { TodoHomeComponent } from './todo-home/todo-home.component';
import { DialogComponent } from './common/dialog/dialog.component';

import {
  MatToolbarModule, MatCardModule, MatListModule, MatDividerModule, MatCheckboxModule, MatDialogModule,
  MatInputModule, MatButtonModule, MAT_DIALOG_DEFAULT_OPTIONS, MatSnackBarModule,MatGridListModule
} from '@angular/material';

// import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    TodoNavbarComponent,
    TodoHomeComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatGridListModule
   // ,AngularFontAwesomeModule
  ],
  providers: [DataService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }

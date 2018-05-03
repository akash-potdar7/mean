import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    HttpClientModule,
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
    MatGridListModule,
   // ,AngularFontAwesomeModule
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ],
  providers: [Title , DataService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }

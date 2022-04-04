import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {CdkTableModule} from "@angular/cdk/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CdkTableModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule, // контейнер для элементов выпадающего списка
    MatSelectModule, // элемент выпадающего списка
  ],
  providers: [],
  entryComponents: [EditTaskDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

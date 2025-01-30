import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import {HttpClientModule} from '@angular/common/http';
import {BASE_URL} from './tokens/base-url.token';

@NgModule({
  declarations: [
    AppComponent,
    // Declare here
    // Declare here
    UserDetailsComponent,
    DepartmentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserFormComponent,
    UserListComponent,
    HttpClientModule,
    DepartmentListComponent,
    DepartmentFormComponent
  ],
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost:8080' } // Define your base URL here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

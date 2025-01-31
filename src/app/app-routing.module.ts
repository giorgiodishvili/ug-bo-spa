import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import {DepartmentListComponent} from './department-list/department-list.component';
import {DepartmentFormComponent} from './department-form/department-form.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id', component: UserFormComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/new', component: DepartmentFormComponent },
  { path: 'departments/:id', component: DepartmentFormComponent }, // Edit mode
  { path: 'analytics', component: DashboardComponent }, // Edit mode
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

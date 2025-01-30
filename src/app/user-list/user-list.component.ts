import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DepartmentService } from '../services/department.service';
import { UserDTO } from '../models/user.model';
import { DepartmentDTO } from '../models/department.model';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    RouterLink,
    NgForOf
  ]
})
export class UserListComponent implements OnInit {
  users: (UserDTO & { departmentName?: string })[] = []; // Extend UserDTO to include departmentName
  departments: DepartmentDTO[] = [];
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    // Fetch departments
    this.departmentService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        this.loadUsers(); // Fetch users only after departments are loaded
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.errorMessage = 'Failed to load departments.';
      },
    });
  }

  loadUsers(): void {
    // Fetch users
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        // Map departmentId to departmentName
        this.users = users.map((user) => {
          const department = this.departments.find(
            (d) => d.id === user.departmentId
          );
          return { ...user, departmentName: department?.name || 'Unknown' };
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.errorMessage = 'Failed to load users.';
      },
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user.');
        },
      });
    }
  }
}

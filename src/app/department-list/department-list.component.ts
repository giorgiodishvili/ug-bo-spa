import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { DepartmentDTO } from '../models/department.model';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
  imports: [
    RouterLink,
    NgForOf
  ]
})
export class DepartmentListComponent implements OnInit {
  departments: DepartmentDTO[] = [];
  errorMessage: string | null = null;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.errorMessage = 'Failed to load departments.';
      },
    });
  }

  deleteDepartment(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe({
        next: () => {
          this.departments = this.departments.filter(
            (department) => department.id !== id
          );
        },
        error: (err) => {
          console.error('Error deleting department:', err);
          alert('Failed to delete department.');
        },
      });
    }
  }
}

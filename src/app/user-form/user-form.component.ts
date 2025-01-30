import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { UserService } from '../services/user.service';
import { UserDTO } from '../models/user.model';
import { DepartmentService } from '../services/department.service';
import { DepartmentDTO } from '../models/department.model';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgClass
  ]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId?: number;

  departments: DepartmentDTO[] = []; // Store departments for dropdown
  globalErrorMessage: string | null = null; // Global error message

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize form
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departmentId: ['', Validators.required], // Dropdown for Department ID
    });
  }

  ngOnInit(): void {
    // Fetch departments for the dropdown
    this.departmentService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.globalErrorMessage = 'Failed to load departments.';
      },
    });

    // Check if we're in edit mode
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.isEditMode = true;
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.userForm.patchValue(user);
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: UserDTO = this.userForm.value;

      if (this.isEditMode) {
        this.userService.updateUser(this.userId!, user).subscribe({
          next: () => {
            this.router.navigate(['/users']);
          },
          error: (err) => {
            console.error('Error updating user:', err);
            this.globalErrorMessage = 'Failed to update the user.';
          },
        });
      } else {
        this.userService.createUser(user).subscribe({
          next: () => {
            this.router.navigate(['/users']);
          },
          error: (err) => {
            console.error('Error creating user:', err);
            this.globalErrorMessage = 'Failed to create the user.';
          },
        });
      }
    }
  }
}

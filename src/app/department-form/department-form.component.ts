import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DepartmentService} from '../services/department.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {DepartmentDTO} from '../models/department.model';

@Component({
  selector: 'app-create-department',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class DepartmentFormComponent {
  departmentForm: FormGroup;
  globalErrorMessage: string | null = null;
  isEditMode = false; // Track if the form is in edit mode
  departmentId?: number; // Store the department ID when editing

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required], // Department name field
    });
  }

  ngOnInit(): void {
    // Check if there's an ID in the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.departmentId = +id;

      // Fetch the department details
      this.departmentService.getDepartmentById(this.departmentId).subscribe({
        next: (department) => {
          this.departmentForm.patchValue(department); // Populate the form with department data
        },
        error: (err) => {
          console.error('Error fetching department:', err);
          this.globalErrorMessage = 'Failed to load the department.';
        },
      });
    }
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const department: DepartmentDTO = this.departmentForm.value;

      if (this.isEditMode) {
        // Update existing department
        this.departmentService.updateDepartment(this.departmentId!, department).subscribe({
          next: () => {
            this.router.navigate(['/departments']); // Redirect to department list
          },
          error: (err) => {
            console.error('Error updating department:', err);
            this.globalErrorMessage = 'Failed to update the department.';
          },
        });
      } else {
        // Create a new department
        this.departmentService.createDepartment(department).subscribe({
          next: () => {
            this.router.navigate(['/departments']); // Redirect to department list
          },
          error: (err) => {
            console.error('Error creating department:', err);
            this.globalErrorMessage = 'Failed to create the department.';
          },
        });
      }
    }
  }
}

import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentDTO } from '../models/department.model';
import {BASE_URL} from '../tokens/base-url.token';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'api/bo/departments'; // Base URL for departments

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {
    console.log('Base URL:', `${this.baseUrl}${this.apiUrl}`);

  }

  // Get all departments
  getAllDepartments(): Observable<DepartmentDTO[]> {
    return this.http.get<DepartmentDTO[]>(`${this.baseUrl}/${this.apiUrl}`);
  }

  // Get a department by ID
  getDepartmentById(id: number): Observable<DepartmentDTO> {
    return this.http.get<DepartmentDTO>(`${this.baseUrl}/${this.apiUrl}/${id}`);
  }

  // Create a new department
  createDepartment(department: DepartmentDTO): Observable<DepartmentDTO> {
    return this.http.post<DepartmentDTO>(`${this.baseUrl}/${this.apiUrl}`, department);
  }

  // Update an existing department
  updateDepartment(id: number, department: DepartmentDTO): Observable<DepartmentDTO> {
    return this.http.put<DepartmentDTO>(`${this.baseUrl}/${this.apiUrl}/${id}`, department);
  }

  // Delete a department by ID
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.apiUrl}/${id}`);
  }
}

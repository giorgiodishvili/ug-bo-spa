import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.model';
import {BASE_URL} from '../tokens/base-url.token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'user/api/bo/users'; // Base URL for users

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}


  // Get all users
  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/${this.apiUrl}`);
  }

  // Get a user by ID
  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/${this.apiUrl}/${id}`);
  }

  // Create a new user
  createUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.baseUrl}/${this.apiUrl}`, user);
  }

  // Update an existing user
  updateUser(id: number, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.baseUrl}/${this.apiUrl}/${id}`, user);
  }

  // Delete a user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.apiUrl}/${id}`);
  }
}

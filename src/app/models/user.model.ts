export interface UserDTO {
  id?: number; // Use `number` in Angular to match Java's `Long`
  name: string;
  email: string;
  departmentId: number; // Use `number` to match Java's `Long`
}

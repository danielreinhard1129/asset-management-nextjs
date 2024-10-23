import { Department } from "../dashboard/department/types";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  provider: Provider;
  departmentId: number;
  department: Department;
}

export enum Role {
  ADMIN = "ADMIN",
  HR = "HR",
  USER = "USER",
}
export enum Provider {
  GOOGLE = "GOOGLE",
  CREDENTIALS = "CREDENTIALS",
}

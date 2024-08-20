export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  provider: Provider;
  departmentId: number;
}

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  EMPLOYEE = "EMPLOYEE",
  CUSTOMER = "CUSTOMER",
}
export enum Provider {
  GOOGLE = "GOOGLE",
  CREDENTIALS = "CREDENTIALS",
}

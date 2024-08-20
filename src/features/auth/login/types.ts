import { Department } from "@/features/department/types";
import { User } from "@/features/user/types";

export interface Login {
  email: string;
  password: string;
}

export interface LoginPayload extends User {
  accessToken: string;
  department: Pick<Department, "name">;
}

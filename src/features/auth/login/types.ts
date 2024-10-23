import { User } from "@/features/user/types";

export interface Login {
  email: string;
  password: string;
}

export interface LoginPayload extends User {
  accessToken: string;
  departmentName: string;
  departmentAddress: string;
}

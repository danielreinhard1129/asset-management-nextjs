import { LoginPayload } from "@/features/auth/login/types";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: LoginPayload;
  }
}

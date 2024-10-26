import LoginPage from "@/features/auth/login";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();

  if (session) {
    if (session.user.role === "USER") {
      redirect("/");
    } else {
      redirect("/dashboard");
    }
  }

  return <LoginPage />;
};

export default Login;

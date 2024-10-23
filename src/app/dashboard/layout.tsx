import AppShellDashboard from "@/components/AppShellDashboard";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !["ADMIN", "HR"].includes(session.user.role)) {
    return notFound();
  }

  return <AppShellDashboard>{children}</AppShellDashboard>;
}

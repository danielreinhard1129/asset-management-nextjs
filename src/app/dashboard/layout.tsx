import AppShellDashboard from "@/components/AppShellDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShellDashboard>{children}</AppShellDashboard>;
}

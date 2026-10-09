import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Demo admin",
  description: "Frontend-only demonstration admin. Not a secure control panel.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}

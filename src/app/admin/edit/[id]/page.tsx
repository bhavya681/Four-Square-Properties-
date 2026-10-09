import { EditPropertyClient } from "@/components/admin/EditPropertyClient";

export const metadata = {
  title: "Edit property (demo)",
  robots: { index: false, follow: false },
};

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditPropertyClient id={id} />;
}

import { PropertyEditor } from "@/components/admin/PropertyEditor";

export const metadata = {
  title: "Add property (demo)",
  robots: { index: false, follow: false },
};

export default function NewPropertyPage() {
  return (
    <div className="container-site py-10">
      <h1 className="text-3xl font-bold text-navy">Add a demo property</h1>
      <div className="card mt-6 p-6">
        <PropertyEditor />
      </div>
    </div>
  );
}

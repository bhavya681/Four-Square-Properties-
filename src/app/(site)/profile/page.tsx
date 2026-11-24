import { brand, contact } from "@/lib/config";
import { ProfileClient } from "./ProfileClient";

export const metadata = {
  title: "Profile - Pramod Kumar Bharti",
  description:
    "Founder of Four Square Properties & Finance Services. Professional profile with 15+ years of experience in Real Estate and Finance.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
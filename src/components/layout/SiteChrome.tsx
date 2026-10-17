import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Chatbot } from "@/components/chat/Chatbot";
import { ReraPopup } from "@/components/ui/ReraPopup";
import { ContactPopup } from "@/components/ui/ContactPopup";
import { TopNotificationBar } from "@/components/ui/TopNotificationBar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNotificationBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ReraPopup />
      <ContactPopup />
    </>
  );
}
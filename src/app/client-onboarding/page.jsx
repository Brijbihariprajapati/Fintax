import ClientOnboardingForm from "../../components/ClientOnboardingForm";

export const metadata = {
  title: "Tax authority form | Glozon FinTax & Advisory",
  description:
    "Complete the GFA authority form. The browser builds a PDF; the app emails it with Resend (see .env.example).",
};

export default function ClientOnboardingPage() {
  return <ClientOnboardingForm />;
}

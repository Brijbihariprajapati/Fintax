import CareerForm from "@/components/CareerForm";

export const metadata = {
  title: "Careers | Glozon FinTax & Advisory",
  description:
    "Apply for career opportunities at Glozon FinTax & Advisory. Submit your CV and details online.",
};

export default function CareerPage() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 min-h-[50vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 uppercase tracking-wide">
            Careers
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We welcome applications from professionals who share our commitment to quality offshore
            financial and taxation services. Complete the form below and attach your CV — our team
            will review your application by email.
          </p>
        </div>
        <CareerForm />
      </div>
    </section>
  );
}

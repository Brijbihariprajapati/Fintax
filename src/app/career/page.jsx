import Link from "next/link";

export const metadata = {
  title: "Careers | Glozon FinTax & Advisory",
  description: "Career opportunities at Glozon FinTax & Advisory.",
};

export default function CareerPage() {
  return (
    <section className="py-20 bg-slate-50 min-h-[50vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 uppercase tracking-wide">
          Careers
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          We welcome enquiries from professionals who share our commitment to quality offshore financial
          and taxation services. Send us your details and we will be in touch.
        </p>
        <Link
          href="/contact-us"
          className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wide rounded-sm shadow transition-colors"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}

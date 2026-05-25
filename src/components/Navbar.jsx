"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { publicAsset } from "@/lib/publicAsset";

const MotionLink = motion.create(Link);

const gfaLogo = publicAsset("GFA Stamp.png");
const headerBanner = publicAsset("homepage banner.3.jpg");

const navLinkClass = (active) =>
  `block w-full text-left px-4 py-3 rounded-md text-sm font-bold uppercase tracking-wide min-h-[44px] flex items-center ${
    active
      ? "text-blue-600 bg-blue-50"
      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-50"
  }`;

const services = [
  { name: "Accounting & Financial Reporting", path: "/services/accounting-financial-reporting" },
  { name: "Taxation & Regulatory Advisory", path: "/services/taxation-regulatory-advisory" },
  { name: "Audit Support & Assurance", path: "/services/audit-support-assurance" },
  { name: "Corporate Secretarial & Entity Formation", path: "/services/corporate-secretarial" },
  { name: "Payroll Processing & Administration", path: "/services/payroll-processing" },
  { name: "Strategic Advisory & Corporate Finance", path: "/services/strategic-advisory" },
  { name: "Human Capital & Professional Development", path: "/services/human-capital-professional-development" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const isServicesSection = pathname.startsWith("/services");

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 left-0 w-full z-50">
      {/* Background banner — shorter on mobile */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={headerBanner}
          alt=""
          className="w-full h-full object-cover object-top"
          aria-hidden
        />
        <div className="absolute inset-0 bg-blue-500/10" />
      </div>

      <div className="relative z-10 h-[5.5rem] sm:h-[7rem] md:h-40">
        <div className="container mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-end pb-2 md:pb-4 md:pt-6">
          <nav className="w-full bg-white/95 backdrop-blur-sm shadow-lg flex justify-between items-center gap-2 py-1.5 px-2 sm:py-2 sm:px-4 rounded-sm min-h-[52px] sm:min-h-[56px]">
            <MotionLink
              href="/"
              className="flex items-center shrink-0 min-w-0 max-w-[55%] sm:max-w-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeMobileMenu}
            >
              <img
                src={gfaLogo}
                alt="GFA Logo"
                className="h-9 sm:h-11 md:h-14 lg:h-16 w-auto object-contain"
              />
            </MotionLink>

            {/* Desktop */}
            <div className="hidden lg:flex flex-wrap justify-end gap-x-5 gap-y-1 items-center text-gray-800 font-bold text-[14px] uppercase tracking-wide">
              <Link
                href="/"
                className={`transition-colors relative group ${pathname === "/" ? "text-blue-600" : "hover:text-blue-600"}`}
              >
                Home
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
              <Link
                href="/about"
                className={`transition-colors relative group ${pathname === "/about" ? "text-blue-600" : "hover:text-blue-600"}`}
              >
                About
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>

              <div className="relative group">
                <button
                  type="button"
                  className={`relative flex items-center transition-colors py-2 uppercase font-bold ${isServicesSection ? "text-blue-600" : "hover:text-blue-600"}`}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  Services
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isServicesSection ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-b-lg border-t-2 border-blue-600 overflow-hidden normal-case font-normal z-50"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <ul className="py-2 max-h-[70vh] overflow-y-auto">
                        {services.map((service) => (
                          <li key={service.path}>
                            <Link
                              href={service.path}
                              className={`block px-4 py-2.5 text-sm transition-colors ${pathname === service.path ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/career"
                className={`transition-colors relative group ${pathname === "/career" ? "text-blue-600" : "hover:text-blue-600"}`}
              >
                Career
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${pathname === "/career" ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
              <Link
                href="/contact-us"
                className={`transition-colors relative group ${pathname === "/contact-us" ? "text-pink-600" : "text-gray-800 hover:text-pink-600"}`}
              >
                Contact
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${pathname === "/contact-us" ? "w-full bg-pink-600" : "w-0 bg-pink-600 group-hover:w-full"}`}
                />
              </Link>
              <Link
                href="/client-onboarding"
                className={`transition-colors relative group ${pathname === "/client-onboarding" ? "text-blue-600" : "hover:text-blue-600"}`}
              >
                Client Onboarding
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${pathname === "/client-onboarding" ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>

              <a
                href="mailto:gfa@glozonfintax.com"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="Email Us"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/116813946/admin/page-posts/published/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1NRJt4x14p/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-1 shrink-0">
              <a
                href="mailto:gfa@glozonfintax.com"
                className="p-2.5 text-gray-600 hover:text-blue-600 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Email"
                aria-label="Email us"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="p-2.5 text-gray-700 hover:text-blue-600 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-panel"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" id="mobile-nav-panel">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute top-0 right-0 h-full w-full max-w-[min(100%,20rem)] bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
                <span className="text-sm font-bold uppercase tracking-wide text-gray-800">Menu</span>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-3">
                <Link href="/" onClick={closeMobileMenu} className={navLinkClass(pathname === "/")}>
                  Home
                </Link>
                <Link href="/about" onClick={closeMobileMenu} className={navLinkClass(pathname === "/about")}>
                  About
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileServicesOpen((o) => !o)}
                  className={`${navLinkClass(isServicesSection)} justify-between`}
                  aria-expanded={isMobileServicesOpen}
                >
                  <span>Services</span>
                  <svg
                    className={`w-5 h-5 shrink-0 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-2 pr-1 pb-2 space-y-0.5 border-l-2 border-blue-200 ml-4 mr-1">
                        {services.map((service) => (
                          <Link
                            key={service.path}
                            href={service.path}
                            onClick={closeMobileMenu}
                            className={`block px-3 py-2.5 rounded-md text-sm normal-case font-medium min-h-[44px] flex items-center ${
                              pathname === service.path
                                ? "text-blue-600 bg-blue-50 font-semibold"
                                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            }`}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link href="/career" onClick={closeMobileMenu} className={navLinkClass(pathname === "/career")}>
                  Career
                </Link>
                <Link
                  href="/contact-us"
                  onClick={closeMobileMenu}
                  className={`${navLinkClass(pathname === "/contact-us")} ${pathname === "/contact-us" ? "text-pink-600" : ""}`}
                >
                  Contact
                </Link>
                <Link
                  href="/client-onboarding"
                  onClick={closeMobileMenu}
                  className={navLinkClass(pathname === "/client-onboarding")}
                >
                  Client Onboarding
                </Link>
              </nav>

              <div className="shrink-0 border-t border-gray-100 px-4 py-4 flex items-center justify-center gap-6">
                <a
                  href="mailto:gfa@glozonfintax.com"
                  className="p-2 text-gray-600 hover:text-blue-600"
                  title="Email"
                  aria-label="Email"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/116813946/admin/page-posts/published/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-blue-600"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/1NRJt4x14p/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-blue-600"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

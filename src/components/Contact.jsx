"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const contactImg = "/assets/contactus.jpg";

const COUNTRY_OPTIONS = ["Australia", "Nepal", "India", "Dubai"];
const OFFICE_ADDRESS = "Changathali 07, Mahalaxmi, Lalitpur, Kathmandu Valley, Nepal";
const OFFICE_PHONE_DISPLAY = "+977 9845 97 1220";
const OFFICE_PHONE_TEL = "+9779845971220";
const OFFICE_EMAIL = "gfa@glozonfintax.com";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Glozon+Business+Solutions+Pvt.+Ltd.,+Lalitpur,+Nepal";

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";
const inputErrorClass =
  "w-full px-4 py-3 border border-red-500 rounded-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors";
const labelClass = "block text-sm font-semibold text-gray-800 mb-1.5";

const EMAIL_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
const PHONE_CHARS_RE = /^\+?[\d\s\-()]+$/;
const NAME_RE = /^[\p{L}\s.'-]+$/u;

function validateEmail(value) {
  const email = String(value || "").trim();
  if (!email) return "Email is required.";
  if (/\s/.test(email)) return "Email cannot contain spaces.";
  if (email.includes("..")) return "Email format is invalid.";
  if (!email.includes("@")) return "Please include @ in your email (e.g. name@example.com).";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address (e.g. name@example.com).";
  return "";
}

function validateCountry(value) {
  const country = String(value || "").trim();
  if (!country) return "Country is required.";
  if (!COUNTRY_OPTIONS.includes(country)) return "Please select a valid country.";
  return "";
}

function validateMobile(value) {
  const mobile = String(value || "").trim();
  if (!mobile) return "Mobile number is required.";
  if (/[a-zA-Z]/.test(mobile)) return "Only numbers and + - ( ) are allowed.";
  if (!PHONE_CHARS_RE.test(mobile)) return "Please enter a valid mobile number.";
  const digits = mobile.replace(/\D/g, "");
  if (digits.length < 8) return "Enter at least 8 digits (e.g. +977 9845971220).";
  if (digits.length > 15) return "Mobile number cannot exceed 15 digits.";
  return "";
}

/** @returns {{ ok: true, values: Record<string, string> } | { ok: false, errors: Record<string, string> }} */
function validateContactForm(fd) {
  const errors = {};
  const fullName = String(fd.get("fullName") || "").trim();
  const email = String(fd.get("email") || "").trim();
  const country = String(fd.get("country") || "").trim();
  const mobile = String(fd.get("mobile") || "").trim();
  const subject = String(fd.get("subject") || "").trim();
  const message = String(fd.get("message") || "").trim();

  if (!fullName) errors.fullName = "Full name is required.";
  else if (fullName.length < 2) errors.fullName = "Please enter at least 2 characters.";
  else if (fullName.length > 200) errors.fullName = "Full name must be 200 characters or less.";
  else if (!NAME_RE.test(fullName)) errors.fullName = "Name can only contain letters, spaces, and . ' -";

  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;

  const countryErr = validateCountry(country);
  if (countryErr) errors.country = countryErr;

  const mobileErr = validateMobile(mobile);
  if (mobileErr) errors.mobile = mobileErr;

  if (!subject) errors.subject = "Subject is required.";
  else if (subject.length < 3) errors.subject = "Subject must be at least 3 characters.";
  else if (subject.length > 200) errors.subject = "Subject must be 200 characters or less.";

  if (!message) errors.message = "Message is required.";
  else if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  else if (message.length > 8000) errors.message = "Message must be 8000 characters or less.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    values: { fullName, email, country, mobile, subject, message },
  };
}

function Field({ id, label, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const setFieldError = (field, message) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const validateFieldLive = (name, value, { force = false } = {}) => {
    if (name === "email") {
      const msg = validateEmail(value);
      if (force || errors.email) setFieldError("email", msg);
      else if (!msg) setFieldError("email", "");
    } else if (name === "mobile") {
      const msg = validateMobile(value);
      if (force || errors.mobile) setFieldError("mobile", msg);
      else if (!msg) setFieldError("mobile", "");
    } else if (name === "country") {
      const msg = validateCountry(value);
      if (force || errors.country) setFieldError("country", msg);
      else if (!msg) setFieldError("country", "");
    } else if (!value?.toString().trim()) setFieldError(name, "");
  };

  const handleMobileInput = (e) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/[^\d+\s\-()]/g, "");
    if (raw !== cleaned) e.target.value = cleaned;
    if (errors.mobile) validateFieldLive("mobile", cleaned);
    else if (validateMobile(cleaned) === "") setFieldError("mobile", "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = validateContactForm(fd);

    if (!result.ok) {
      setErrors(result.errors);
      const first = Object.values(result.errors)[0];
      toast.error(first || "Please fix the highlighted fields.");
      const firstKey = Object.keys(result.errors)[0];
      const el = form.querySelector(`[name="${firstKey}"]`);
      if (el && typeof el.focus === "function") el.focus();
      return;
    }

    setErrors({});
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = Array.isArray(data.details)
          ? data.details.join(" ")
          : data.error || "Could not send message.";
        toast.error(msg);
        return;
      }
      toast.success("Message sent. Our team will get back to you.");
      form.reset();
      setErrors({});
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const fieldClass = (name) => (errors[name] ? inputErrorClass : inputClass);

  return (
    <>
      <section className="py-16 bg-white" id="contact">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 uppercase tracking-wider"
            >
              Contact Us
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={contactImg}
                alt="Contact Us Illustration"
                className="mx-auto w-[300px] h-[234px] object-contain"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col space-y-10 items-center text-center mt-8"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-2">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-red-500 font-bold text-lg mb-2">Address</h3>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 text-sm max-w-xs text-center hover:text-blue-600 hover:underline underline-offset-2"
                  title="Open in Google Maps"
                >
                  {OFFICE_ADDRESS}
                </a>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center mb-2">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-green-500 font-bold text-lg mb-2">Phone</h3>
                <a
                  href={`tel:${OFFICE_PHONE_TEL}`}
                  className="text-gray-700 text-sm hover:text-green-600 hover:underline underline-offset-2"
                  title="Call us"
                >
                  {OFFICE_PHONE_DISPLAY}
                </a>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-yellow-400 flex items-center justify-center mb-2">
                  <svg
                    className="w-8 h-8 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-yellow-400 font-bold text-lg mb-2">Email</h3>
                <a
                  href={`mailto:${OFFICE_EMAIL}`}
                  className="text-blue-500 text-sm hover:underline underline-offset-2"
                >
                  {OFFICE_EMAIL}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col mt-8"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-2 uppercase text-center md:text-left">
                Get In Touch
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center md:text-left">
                All fields are required.
              </p>
              <form noValidate onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <Field id="fullName" label="Full name" error={errors.fullName} required>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    required
                    autoComplete="name"
                    maxLength={200}
                    className={fieldClass("fullName")}
                    onChange={(e) => {
                      if (e.target.value.trim()) setFieldError("fullName", "");
                    }}
                    aria-invalid={!!errors.fullName}
                  />
                </Field>

                <Field id="email" label="Email address" error={errors.email} required>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    autoComplete="email"
                    inputMode="email"
                    maxLength={254}
                    spellCheck={false}
                    className={fieldClass("email")}
                    onChange={(e) => validateFieldLive("email", e.target.value)}
                    onBlur={(e) => validateFieldLive("email", e.target.value, { force: true })}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </Field>

                <Field id="country" label="Country" error={errors.country} required>
                  <select
                    id="country"
                    name="country"
                    required
                    defaultValue=""
                    className={fieldClass("country")}
                    onChange={(e) => validateFieldLive("country", e.target.value, { force: true })}
                    onBlur={(e) => validateFieldLive("country", e.target.value, { force: true })}
                    aria-invalid={!!errors.country}
                  >
                    <option value="" disabled>
                      Select country
                    </option>
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="mobile" label="Mobile number" error={errors.mobile} required>
                  <input
                    id="mobile"
                    type="tel"
                    name="mobile"
                    placeholder="+977 9845971220"
                    required
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={20}
                    className={fieldClass("mobile")}
                    onChange={handleMobileInput}
                    onBlur={(e) => validateFieldLive("mobile", e.target.value, { force: true })}
                    aria-invalid={!!errors.mobile}
                    aria-describedby={errors.mobile ? "mobile-error" : undefined}
                  />
                </Field>

                <Field id="subject" label="Subject" error={errors.subject} required>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    required
                    maxLength={200}
                    className={fieldClass("subject")}
                    onChange={(e) => {
                      if (e.target.value.trim()) setFieldError("subject", "");
                    }}
                    aria-invalid={!!errors.subject}
                  />
                </Field>

                <Field id="message" label="Message" error={errors.message} required>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message…"
                    required
                    rows={4}
                    maxLength={8000}
                    className={`${fieldClass("message")} resize-y text-sm min-h-[120px]`}
                    onChange={(e) => {
                      if (e.target.value.trim()) setFieldError("message", "");
                    }}
                    aria-invalid={!!errors.message}
                  />
                </Field>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-8 py-2 border border-pink-500 text-gray-800 font-medium hover:bg-pink-50 transition-colors uppercase tracking-wide text-sm rounded-sm disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "SEND"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="w-full relative h-[450px] border border-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14136.216345869274!2d85.34796695!3d27.65376175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb110d5142fb21%3A0xc8948a24aae2e25f!2sGlozon%20Business%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1715600000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Glozon FinTax Location Map"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;

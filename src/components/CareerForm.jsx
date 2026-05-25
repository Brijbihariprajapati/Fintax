"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  getActivePositions,
  COUNTRY_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "@/data/career";

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";
const inputErrorClass =
  "w-full px-4 py-3 border border-red-500 rounded-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors";
const labelClass = "block text-sm font-semibold text-gray-800 mb-1.5";

const EMAIL_RE =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
const PHONE_CHARS_RE = /^\+?[\d\s\-()]+$/;
const NAME_RE = /^[\p{L}\s.'-]+$/u;
const CV_EXT_RE = /\.(pdf|doc|docx)$/i;
const MAX_CV_BYTES = 5 * 1024 * 1024;

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

function validateEmail(value) {
  const email = String(value || "").trim();
  if (!email) return "Email is required.";
  if (/\s/.test(email)) return "Email cannot contain spaces.";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address.";
  return "";
}

function validateMobile(value) {
  const mobile = String(value || "").trim();
  if (!mobile) return "Mobile number is required.";
  if (/[a-zA-Z]/.test(mobile)) return "Only numbers and + - ( ) are allowed.";
  if (!PHONE_CHARS_RE.test(mobile)) return "Please enter a valid mobile number.";
  const digits = mobile.replace(/\D/g, "");
  if (digits.length < 8) return "Enter at least 8 digits.";
  if (digits.length > 15) return "Mobile number cannot exceed 15 digits.";
  return "";
}

function validateCv(file) {
  if (!file || !(file instanceof File)) return "CV / resume is required (PDF, DOC, or DOCX).";
  if (!CV_EXT_RE.test(file.name)) return "CV must be PDF, DOC, or DOCX.";
  if (file.size > MAX_CV_BYTES) return "CV must be 5 MB or smaller.";
  if (file.size === 0) return "CV file is empty.";
  return "";
}

function validateCareerForm(fd) {
  const errors = {};
  const fullName = String(fd.get("fullName") || "").trim();
  const email = String(fd.get("email") || "").trim();
  const country = String(fd.get("country") || "").trim();
  const mobile = String(fd.get("mobile") || "").trim();
  const positionId = String(fd.get("positionId") || "").trim();
  const positionOther = String(fd.get("positionOther") || "").trim();
  const experience = String(fd.get("experience") || "").trim();
  const linkedIn = String(fd.get("linkedIn") || "").trim();
  const message = String(fd.get("message") || "").trim();
  const cv = fd.get("cv");

  if (!fullName) errors.fullName = "Full name is required.";
  else if (fullName.length < 2) errors.fullName = "Please enter at least 2 characters.";
  else if (!NAME_RE.test(fullName)) errors.fullName = "Name can only contain letters, spaces, and . ' -";

  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;

  if (!country) errors.country = "Country is required.";
  else if (!COUNTRY_OPTIONS.includes(country)) errors.country = "Please select a valid country.";

  const mobileErr = validateMobile(mobile);
  if (mobileErr) errors.mobile = mobileErr;

  if (!positionId) errors.positionId = "Please select a position.";
  else if (positionId === "other" && positionOther.length < 2) {
    errors.positionOther = "Please specify the role you are applying for.";
  }

  if (!experience) errors.experience = "Experience is required.";

  if (linkedIn && !/^https?:\/\/.+/i.test(linkedIn)) {
    errors.linkedIn = "LinkedIn URL must start with http:// or https://";
  }

  if (!message) errors.message = "Cover letter is required.";
  else if (message.length < 20) errors.message = "Cover letter must be at least 20 characters.";
  else if (message.length > 8000) errors.message = "Cover letter must be 8000 characters or less.";

  const cvErr = validateCv(cv instanceof File ? cv : null);
  if (cvErr) errors.cv = cvErr;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const positions = getActivePositions();
  const positionTitle =
    positionId === "other"
      ? positionOther
      : positions.find((p) => p.id === positionId)?.title || positionId;

  return {
    ok: true,
    positionTitle,
  };
}

export default function CareerForm() {
  const positions = useMemo(() => getActivePositions(), []);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [positionId, setPositionId] = useState("");
  const [cvName, setCvName] = useState("");

  const setFieldError = (field, message) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const fieldClass = (name) => (errors[name] ? inputErrorClass : inputClass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = validateCareerForm(fd);

    if (!result.ok) {
      setErrors(result.errors);
      toast.error(Object.values(result.errors)[0] || "Please fix the highlighted fields.");
      const firstKey = Object.keys(result.errors)[0];
      const el = form.querySelector(`[name="${firstKey}"], #${firstKey}`);
      if (el && typeof el.focus === "function") el.focus();
      return;
    }

    setErrors({});
    setSending(true);
    try {
      const res = await fetch("/api/career", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = Array.isArray(data.details)
          ? data.details.join(" ")
          : data.error || "Could not submit application.";
        toast.error(msg);
        return;
      }
      toast.success("Application sent. Our HR team will review your CV and contact you.");
      form.reset();
      setPositionId("");
      setCvName("");
      setErrors({});
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-sm shadow-sm p-6 md:p-8"
    >
        <h2 className="text-xl font-bold text-blue-900 mb-1 uppercase tracking-wide">
          Apply now
        </h2>
        <p className="text-sm text-gray-600 mb-6">All fields are required. Attach your CV (PDF, DOC, or DOCX, max 5 MB).</p>

        <form noValidate onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Field id="fullName" label="Full name" error={errors.fullName} required>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              maxLength={200}
              autoComplete="name"
              className={fieldClass("fullName")}
              onChange={(e) => e.target.value.trim() && setFieldError("fullName", "")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="email" label="Email" error={errors.email} required>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className={fieldClass("email")}
                onChange={(e) => !validateEmail(e.target.value) && setFieldError("email", "")}
              />
            </Field>
            <Field id="mobile" label="Mobile" error={errors.mobile} required>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                inputMode="tel"
                maxLength={20}
                autoComplete="tel"
                placeholder="+977 9845971220"
                className={fieldClass("mobile")}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^\d+\s\-()]/g, "");
                  if (e.target.value !== cleaned) e.target.value = cleaned;
                  if (!validateMobile(cleaned)) setFieldError("mobile", "");
                }}
              />
            </Field>
          </div>

          <Field id="country" label="Country" error={errors.country} required>
            <select
              id="country"
              name="country"
              required
              defaultValue=""
              className={fieldClass("country")}
              onChange={(e) => e.target.value && setFieldError("country", "")}
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

          <Field id="positionId" label="Position applying for" error={errors.positionId} required>
            <select
              id="positionId"
              name="positionId"
              required
              value={positionId}
              className={fieldClass("positionId")}
              onChange={(e) => {
                setPositionId(e.target.value);
                setFieldError("positionId", "");
                if (e.target.value !== "other") setFieldError("positionOther", "");
              }}
            >
              <option value="" disabled>
                Select position
              </option>
              {positions.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
              <option value="other">Other (specify below)</option>
            </select>
          </Field>

          {positionId === "other" && (
            <Field id="positionOther" label="Position title" error={errors.positionOther} required>
              <input
                id="positionOther"
                name="positionOther"
                type="text"
                required
                maxLength={120}
                placeholder="e.g. Business Analyst"
                className={fieldClass("positionOther")}
                onChange={(e) => e.target.value.trim() && setFieldError("positionOther", "")}
              />
            </Field>
          )}

          <Field id="experience" label="Years of experience" error={errors.experience} required>
            <select
              id="experience"
              name="experience"
              required
              defaultValue=""
              className={fieldClass("experience")}
              onChange={(e) => e.target.value && setFieldError("experience", "")}
            >
              <option value="" disabled>
                Select experience
              </option>
              {EXPERIENCE_OPTIONS.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </Field>

          <Field id="linkedIn" label="LinkedIn profile (optional)" error={errors.linkedIn} required={false}>
            <input
              id="linkedIn"
              name="linkedIn"
              type="url"
              placeholder="https://linkedin.com/in/..."
              className={fieldClass("linkedIn")}
              onChange={(e) => setFieldError("linkedIn", "")}
            />
          </Field>

          <Field id="message" label="Cover letter / message" error={errors.message} required>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={8000}
              placeholder="Tell us about your skills and why you want to join GFA…"
              className={`${fieldClass("message")} resize-y min-h-[120px]`}
              onChange={(e) => e.target.value.trim().length >= 20 && setFieldError("message", "")}
            />
          </Field>

          <Field id="cv" label="Upload CV / resume" error={errors.cv} required>
            <input
              id="cv"
              name="cv"
              type="file"
              required
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className={`${fieldClass("cv")} file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:bg-blue-50 file:text-blue-800 file:font-medium file:cursor-pointer`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                setCvName(file?.name || "");
                setFieldError("cv", file ? validateCv(file) : "CV / resume is required.");
              }}
            />
            {cvName ? <p className="mt-1 text-xs text-gray-500">Selected: {cvName}</p> : null}
          </Field>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={sending}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wide rounded-sm shadow transition-colors disabled:opacity-60"
            >
              {sending ? "Submitting…" : "Submit application"}
            </button>
          </div>
        </form>
    </motion.div>
  );
}

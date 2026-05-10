"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-gray-800";
const labelClass = "block text-sm font-semibold text-gray-800 mb-1.5";
const sectionTitle =
  "text-lg font-bold text-blue-800 border-b-2 border-blue-600 pb-2 mb-6";

const incomeOptions = [
  { id: "rental", label: "Rental Income" },
  { id: "investment", label: "Investment / Dividends" },
  { id: "government", label: "Centrelink / Government" },
  { id: "freelance", label: "Freelance / Contracting" },
  { id: "crypto", label: "Crypto / Capital Gains" },
  { id: "foreign", label: "Foreign Income" },
];

const deductionOptions = [
  { id: "work", label: "Work-Related Expenses" },
  { id: "vehicle", label: "Vehicle & Travel" },
  { id: "homeoffice", label: "Home Office" },
  { id: "education", label: "Self-Education" },
  { id: "charity", label: "Charitable Donations" },
  { id: "insurance", label: "Income Protection Insurance" },
];

function SignatureField({ onSignatureChange }) {
  const hasInk = useRef(false);
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPoint = useRef(null);
  const onSigRef = useRef(onSignatureChange);
  useEffect(() => {
    onSigRef.current = onSignatureChange;
  }, [onSignatureChange]);

  const notify = useCallback((payload) => {
    onSigRef.current?.(payload);
  }, []);

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = Math.max(320, canvas.offsetWidth || canvas.parentElement?.clientWidth || 600);
    const h = 160;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1e3a8a";
    ctx.lineWidth = 2;
    hasInk.current = false;
    notify({ dataUrl: "", hasInk: false });
  }, [notify]);

  // Mount only — ResizeObserver was re-running init and clearing signature state after draw.
  useEffect(() => {
    resetCanvas();
  }, [resetCanvas]);

  const getPoint = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    const clientY = e.touches?.[0]?.clientY ?? e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const startStroke = (e) => {
    e.preventDefault();
    drawing.current = true;
    lastPoint.current = getPoint(e);
  };

  const drawStroke = (e) => {
    e.preventDefault();
    if (!drawing.current || !canvasRef.current || lastPoint.current == null) return;
    const ctx = canvasRef.current.getContext("2d");
    const p = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastPoint.current = p;
    hasInk.current = true;
    notify({ dataUrl: canvasRef.current.toDataURL("image/png"), hasInk: true });
  };

  const endStroke = (e) => {
    e?.preventDefault();
    drawing.current = false;
    lastPoint.current = null;
    if (canvasRef.current && hasInk.current) {
      notify({ dataUrl: canvasRef.current.toDataURL("image/png"), hasInk: true });
    }
  };

  const clear = () => {
    resetCanvas();
  };

  return (
    <div>
      <p className={`${labelClass} mb-2`}>Please sign below (use mouse or touch)</p>
      <div className="border-2 border-dashed border-gray-300 rounded-sm bg-gray-50 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-40 touch-none cursor-crosshair block"
          onMouseDown={startStroke}
          onMouseMove={drawStroke}
          onMouseUp={endStroke}
          onMouseLeave={endStroke}
          onTouchStart={startStroke}
          onTouchMove={drawStroke}
          onTouchEnd={endStroke}
        />
      </div>
      <button
        type="button"
        onClick={clear}
        className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
      >
        Clear Signature
      </button>
    </div>
  );
}

export default function ClientOnboardingForm() {
  const [incomeSet, setIncomeSet] = useState(() => new Set());
  const [deductionSet, setDeductionSet] = useState(() => new Set());
  const [signature, setSignature] = useState({ dataUrl: "", hasInk: false });
  const [signatureKey, setSignatureKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleId = (setFn, id) => {
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Allow this handler to run even when fields fail validation, then show native hints + toast.
    if (!form.checkValidity()) {
      form.reportValidity();
      toast.error("Please fill in all required fields (including date of birth).");
      return;
    }

    if (!signature.hasInk) {
      toast.error("Please provide your signature before submitting.");
      return;
    }

    const fd = new FormData(form);
    const signaturePngBase64 = signature.dataUrl.replace(/^data:image\/png;base64,/, "");

    const payload = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      dob: fd.get("dob"),
      tfn: fd.get("tfn"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      address: fd.get("address"),
      residency: fd.get("residency"),
      financialYear: fd.get("financialYear"),
      employer: fd.get("employer"),
      abn: fd.get("abn"),
      grossIncome: fd.get("grossIncome"),
      taxWithheld: fd.get("taxWithheld"),
      otherIncome: [...incomeSet],
      deductions: [...deductionSet],
      notes: fd.get("notes"),
      bankName: fd.get("bankName"),
      accountName: fd.get("accountName"),
      bsb: fd.get("bsb"),
      accountNumber: fd.get("accountNumber"),
      signaturePngBase64,
      submittedAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/client-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detailMsg =
          Array.isArray(data.details) && data.details.length > 0
            ? data.details.join(" ")
            : "";
        throw new Error(
          [data.error, detailMsg, data.hint].filter(Boolean).join(" ") || `Request failed (${res.status})`
        );
      }
      toast.success(
        "Your form was submitted successfully. Our team will contact you within 1–2 business days."
      );
      form.reset();
      setIncomeSet(new Set());
      setDeductionSet(new Set());
      setSignature({ dataUrl: "", hasInk: false });
      setSignatureKey((k) => k + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-widest text-blue-200 mb-2"
          >
            Glozon FinTax & Advisory
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            Income Tax Return — Client Onboarding
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            Complete the form below and our team will prepare your tax return.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl -mt-8 relative z-10">
        <nav className="text-sm text-gray-600 mb-4 bg-white/90 backdrop-blur px-2 py-2 rounded-sm inline-block shadow-sm">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-800 font-medium">Client Onboarding</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl border border-gray-100 rounded-sm overflow-hidden"
        >
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-5 md:px-10 md:py-8">
            <h2 className="text-2xl font-bold text-gray-900">Income Tax Return Form</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Please fill in all required fields below. Our accountants will review your information
              and contact you within 1–2 business days to proceed with your tax return preparation.
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit} className="px-6 py-8 md:px-10 md:py-10 space-y-10">
            <section>
              <h3 className={sectionTitle}>Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input name="firstName" type="text" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input name="lastName" type="text" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Date of Birth *</label>
                  <input name="dob" type="date" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Tax File Number (TFN)</label>
                  <input name="tfn" type="text" autoComplete="off" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input name="phone" type="tel" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input name="email" type="email" required className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Residential Address</label>
                  <input name="address" type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Residency Status</label>
                  <select name="residency" className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    <option value="australian">Australian Resident</option>
                    <option value="foreign">Foreign Resident</option>
                    <option value="whm">Working Holiday Maker</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Financial Year</label>
                  <select name="financialYear" className={inputClass} defaultValue="2024-2025">
                    <option value="2024-2025">2024–2025</option>
                    <option value="2023-2024">2023–2024</option>
                    <option value="2022-2023">2022–2023</option>
                    <option value="2021-2022">2021–2022</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h3 className={sectionTitle}>Income Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClass}>Employer Name</label>
                  <input name="employer" type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>ABN (if self-employed)</label>
                  <input name="abn" type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Gross Income (approx.)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      name="grossIncome"
                      type="text"
                      className={`${inputClass} pl-8`}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Tax Withheld (approx.)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      name="taxWithheld"
                      type="text"
                      className={`${inputClass} pl-8`}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className={labelClass}>Other Income Sources</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {incomeOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-3 cursor-pointer text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={incomeSet.has(opt.id)}
                        onChange={() => toggleId(setIncomeSet, opt.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h3 className={sectionTitle}>Deductions</h3>
              <p className={labelClass}>Deduction Types Applicable</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deductionOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-3 cursor-pointer text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={deductionSet.has(opt.id)}
                      onChange={() => toggleId(setDeductionSet, opt.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h3 className={sectionTitle}>Additional Notes / Special Circumstances</h3>
              <textarea
                name="notes"
                rows={4}
                className={inputClass}
                placeholder="Anything we should know about your situation…"
              />
            </section>

            <section>
              <h3 className={sectionTitle}>Bank Details (for refund)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Bank Name</label>
                  <input name="bankName" type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Account Name</label>
                  <input name="accountName" type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>BSB</label>
                  <input name="bsb" type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Account Number</label>
                  <input name="accountNumber" type="text" className={inputClass} />
                </div>
              </div>
            </section>

            <section>
              <h3 className={sectionTitle}>Signature</h3>
              <SignatureField key={signatureKey} onSignatureChange={setSignature} />
            </section>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:pointer-events-none text-white font-bold uppercase tracking-wide rounded-sm shadow-lg transition-colors"
              >
                {isSubmitting ? "Submitting…" : "Submit Tax Form"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

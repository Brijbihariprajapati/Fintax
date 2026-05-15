"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { buildGfaTaxAuthorityPdfBlob } from "../lib/gfaTaxAuthorityPdf";

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-gray-800";
const labelClass = "block text-sm font-semibold text-gray-800 mb-1.5";
const sectionTitle =
  "text-lg font-bold text-blue-800 border-b-2 border-blue-600 pb-2 mb-6";

const RECIPIENT_INFO = "gfa@glozonfintax.com";

/** @param {Blob} blob */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const s = r.result;
      if (typeof s !== "string") {
        reject(new Error("Could not read PDF."));
        return;
      }
      const i = s.indexOf(",");
      resolve(i >= 0 ? s.slice(i + 1) : s);
    };
    r.onerror = () => reject(r.error ?? new Error("Could not read PDF."));
    r.readAsDataURL(blob);
  });
}

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
      <p className={`${labelClass} mb-2`}>Signature box (mouse or touch)</p>
      <motion.div className="border-2 border-dashed border-gray-300 rounded-sm bg-gray-50 overflow-hidden">
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
      </motion.div>
      <button
        type="button"
        onClick={clear}
        className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
      >
        Clear signature
      </button>
    </div>
  );
}

const DECLARATION =
  "I declare that the information provided above is true and correct. I authorize Easy Tax and Accounting Services Pty Ltd, to represent me in relation to my taxation affairs, communicate with the ATO on my behalf, and lodge all necessary tax documents including overdue lodgements. I agree to pay the applicable service fee once my ATO lodgement or other accounting work is prepared and sent to me for review, regardless of whether I proceed with signing or the outcome differs from my expectations.";

export default function ClientOnboardingForm() {
  const [businessType, setBusinessType] = useState("individual");
  const [signature, setSignature] = useState({ dataUrl: "", hasInk: false });
  const [signatureKey, setSignatureKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      toast.error("Please complete all required fields.");
      return;
    }

    if (!signature.hasInk) {
      toast.error("Please sign in the signature box before submitting.");
      return;
    }

    const fd = new FormData(form);
    const firstName = String(fd.get("firstName") || "").trim();
    const lastName = String(fd.get("lastName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const tfn = String(fd.get("tfn") || "").trim();
    const dob = String(fd.get("dob") || "").trim();
    const abn = String(fd.get("abn") || "").trim();
    const signatoryName = String(fd.get("signatoryName") || "").trim();
    const signDate = String(fd.get("signDate") || "").trim();
    const authorityConfirmed = fd.get("authorityConfirmed") === "on";

    if (!authorityConfirmed) {
      toast.error("Please confirm the Authority to Act section.");
      return;
    }

    const record = {
      firstName,
      lastName,
      email,
      phone,
      businessType,
      tfn,
      dob: businessType === "individual" ? dob : "",
      abn: businessType === "entity" ? abn : "",
      authorityConfirmed,
      signatoryName,
      signDate,
      submittedAt: new Date().toISOString(),
    };

    const sigDataUrl = signature.dataUrl;

    setIsSubmitting(true);
    try {
      const pdfBlob = await buildGfaTaxAuthorityPdfBlob(record, sigDataUrl);
      const pdfBase64 = await blobToBase64(pdfBlob);

      const res = await fetch("/api/send-tax-authority", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          businessType,
          tfn,
          dob: businessType === "individual" ? dob : "",
          abn: businessType === "entity" ? abn : "",
          signatoryName,
          signDate,
          authorityConfirmed: true,
          submittedAt: record.submittedAt,
          pdfBase64,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detailMsg =
          Array.isArray(data.details) && data.details.length > 0 ? data.details.join(" ") : "";
        throw new Error(
          [data.error, detailMsg].filter(Boolean).join(" ") || `Request failed (${res.status})`
        );
      }

      toast.success(`Submitted successfully. PDF emailed to ${data.to || RECIPIENT_INFO}.`);

      form.reset();
      setBusinessType("individual");
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
            Tax authority form
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            Complete the form and submit. The PDF is built in your browser, then our server emails it with Resend—no
            download for visitors.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl -mt-8 relative z-10">
        <nav className="text-sm text-gray-600 mb-4 bg-white/90 backdrop-blur px-2 py-2 rounded-sm inline-block shadow-sm">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-800 font-medium">Client onboarding</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl border border-gray-100 rounded-sm overflow-hidden"
        >

          <form noValidate onSubmit={handleSubmit} className="px-6 py-8 md:px-10 md:py-10 space-y-10">
            <section>
              <h3 className={sectionTitle}>Your information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First name *</label>
                  <input name="firstName" type="text" required maxLength={120} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Last name *</label>
                  <input name="lastName" type="text" required maxLength={120} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input name="email" type="email" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Contact no. *</label>
                  <input name="phone" type="tel" required className={inputClass} />
                </div>
              </div>
            </section>

            <section>
              <h3 className={sectionTitle}>Type of business</h3>
              <div className="space-y-3 text-gray-800">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="businessTypeUi"
                    checked={businessType === "individual"}
                    onChange={() => setBusinessType("individual")}
                    className="w-4 h-4 text-blue-600"
                  />
                  Option 1: Individual
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="businessTypeUi"
                    checked={businessType === "entity"}
                    onChange={() => setBusinessType("entity")}
                    className="w-4 h-4 text-blue-600"
                  />
                  Option 2: Entity (Company, Trust, Partnership etc.)
                </label>
              </div>
              <input type="hidden" name="businessType" value={businessType} readOnly />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {businessType === "individual" ? (
                  <>
                    <div>
                      <label className={labelClass}>Tax file number (TFN) *</label>
                      <input name="tfn" type="text" autoComplete="off" required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Date of birth *</label>
                      <input name="dob" type="date" required className={inputClass} />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className={labelClass}>Australian business number (ABN)</label>
                      <input name="abn" type="text" autoComplete="off" maxLength={32} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Tax file number (TFN) *</label>
                      <input name="tfn" type="text" autoComplete="off" required className={inputClass} />
                    </div>
                    <input type="hidden" name="dob" value="" />
                  </>
                )}
              </div>
            </section>

            <section>
              <h3 className={sectionTitle}>Authority to act</h3>
              <ul className="list-none space-y-2 text-sm text-gray-700 mb-4">
                <li>✓ Add my details to the Tax Agent Portal.</li>
                <li>✓ Access, manage, and update my ATO records.</li>
                <li>✓ Lodge my Income Tax Returns (current and prior years).</li>
                <li>✓ Lodge any overdue obligations and correct historical errors.</li>
                <li>✓ Receive ATO correspondence on my behalf.</li>
                <li>✓ Communicate with the ATO as required in relation to my tax affairs.</li>
              </ul>
              <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-800">
                <input
                  type="checkbox"
                  name="authorityConfirmed"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <span>I confirm the authority to act statements above.</span>
              </label>
            </section>

            <section>
              <h3 className={sectionTitle}>Declaration</h3>
              <p className="text-sm text-gray-700 leading-relaxed border border-gray-200 bg-gray-50 p-4 rounded-sm">
                {DECLARATION}
              </p>
            </section>

            <section>
              <h3 className={sectionTitle}>Sign</h3>
              <SignatureField key={signatureKey} onSignatureChange={setSignature} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input name="signatoryName" type="text" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Date *</label>
                  <input name="signDate" type="date" required className={inputClass} />
                </div>
              </div>
            </section>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:pointer-events-none text-white font-bold uppercase tracking-wide rounded-sm shadow-lg transition-colors"
              >
                {isSubmitting ? "Sending…" : "Submit and send"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

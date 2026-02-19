"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, User, Mail, MapPin, MessageSquare, CheckCircle, Loader2, Fence } from "lucide-react";

interface CallbackFormProps {
  campaign?: string;
  compact?: boolean;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function CallbackForm({ campaign = "general", compact = false }: CallbackFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    zipCode: "",
    fenceType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  // Load reCAPTCHA v3 script
  useEffect(() => {
    if (typeof window !== "undefined" && !document.querySelector(`script[src*="recaptcha"]`)) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setRecaptchaLoaded(true);
      document.head.appendChild(script);
    } else if (typeof window !== "undefined" && window.grecaptcha) {
      setRecaptchaLoaded(true);
    }
  }, [siteKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e?.target ?? {};
    setFormData((prev) => ({ ...(prev ?? {}), [name ?? ""]: value ?? "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setIsSubmitting(true);
    setError("");

    try {
      // Get reCAPTCHA token
      let recaptchaToken = "";
      if (recaptchaLoaded && window.grecaptcha) {
        recaptchaToken = await new Promise((resolve) => {
          window.grecaptcha.ready(async () => {
            const token = await window.grecaptcha.execute(siteKey, { action: "submit_form" });
            resolve(token);
          });
        });
      }

      const response = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...(formData ?? {}), campaign, recaptchaToken }),
      });

      if (response?.ok) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", zipCode: "", fenceType: "", message: "" });
      } else {
        const data = await response.json();
        setError(data?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">We&apos;ll call you back within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          value={formData?.name ?? ""}
          onChange={handleChange}
          required
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition"
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number *"
          value={formData?.phone ?? ""}
          onChange={handleChange}
          required
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition"
        />
      </div>

      {!compact && (
        <>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData?.email ?? ""}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData?.zipCode ?? ""}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition"
            />
          </div>

          <div className="relative">
            <Fence className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="fenceType"
              value={formData?.fenceType ?? ""}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition bg-white"
            >
              <option value="">Select Fence Type</option>
              <option value="vinyl">Vinyl Privacy Fence</option>
              <option value="chainlink">Chain Link Fence</option>
              <option value="aluminum">Ornamental Aluminum</option>
              <option value="wood">Wood Fence</option>
              <option value="other">Other / Not Sure</option>
            </select>
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <textarea
              name="message"
              placeholder="Tell us about your project (optional)"
              value={formData?.message ?? ""}
              onChange={handleChange}
              rows={3}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition resize-none"
            />
          </div>
        </>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-orange hover:bg-orange-dark text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
        ) : (
          <>REQUEST CALL BACK<Phone className="w-5 h-5" /></>
        )}
      </motion.button>

      {/* reCAPTCHA Privacy Notice */}
      <p className="text-xs text-gray-500 text-center mt-3">
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </form>
  );
}

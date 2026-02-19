"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import CallbackForm from "./callback-form";

export default function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://inline-fence.com/wp-content/uploads/a-team-of-professional-fence-installers-working-o.webp"
          alt="Professional fence installation"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Urgency Message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-orange mb-4">
              <Calendar className="w-6 h-6" />
              <span className="font-semibold uppercase tracking-wide">Limited Availability</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Don&apos;t Wait for <span className="text-orange">Summer!</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Installation slots fill up fast as the weather warms up. Secure your spot on our schedule today and enjoy your new fence by spring.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:5088810910"
                className="inline-flex items-center justify-center gap-3 bg-orange hover:bg-orange-dark text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Call Now: (508) 881-0910
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4 text-white/80">
              <ArrowRight className="w-5 h-5 text-orange" />
              <span>Free estimates • No obligation</span>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-navy mb-2">Get Your Free Quote</h3>
              <p className="text-gray-600">We&apos;ll respond within 24 hours</p>
            </div>
            <CallbackForm campaign="urgency-cta" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

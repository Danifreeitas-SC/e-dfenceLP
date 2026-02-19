"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 50);
    };
    window?.addEventListener?.("scroll", handleScroll);
    return () => window?.removeEventListener?.("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Image
              src="/logo.png"
              alt="E&D Fencing Inc. Logo"
              width={120}
              height={60}
              className="h-12 sm:h-14 w-auto"
              priority
            />
          </motion.div>

          {/* Desktop Contact */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:5088810910"
              className="flex items-center gap-2 text-navy hover:text-orange transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">(508) 881-0910</span>
            </a>
            <a
              href="#quote"
              className="bg-orange hover:bg-orange-dark text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-navy p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 border-t border-gray-100"
          >
            <div className="flex flex-col gap-4 pt-4">
              <a
                href="tel:5088810910"
                className="flex items-center gap-2 text-navy hover:text-orange transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">(508) 881-0910</span>
              </a>
              <a
                href="#quote"
                className="bg-orange hover:bg-orange-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Free Quote
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

"use client";

import { motion } from "framer-motion";
import { Phone, Star, Shield, Clock } from "lucide-react";
import Image from "next/image";
import CallbackForm from "./callback-form";

interface HeroSectionProps {
  variant?: "wildlife" | "pets" | "privacy";
}

const heroContent = {
  wildlife: {
    headline: "Keep Wildlife Out of Your Backyard",
    subheadline: "Protect your landscape and peace of mind. Our specialized fencing stops deer, coyotes, and other local wildlife from invading your property.",
    image: "https://ey2msiqxj7z.exactdn.com/wp-content/uploads/2022/06/13165927/Deer_iStock_987685954.jpg?strip=all&lossy=1&ssl=1",
  },
  pets: {
    headline: "Total Protection for Your Furry Family",
    subheadline: "Stop worrying about predators or escapes. Create a safe haven where your pets can play freely and securely all year round.",
    image: "/pets-hero.jpg",
  },
  privacy: {
    headline: "Your Backyard Deserves Absolute Privacy",
    subheadline: "Turn your outdoor space into a private sanctuary. Block noise, wind, and curious neighbors with our premium privacy panels.",
    image: "https://static.homeguide.com/assets/images/content/homeguide-wood-privacy-fence-installation-behind-home-yard.jpg",
  },
};

export default function HeroSection({ variant = "privacy" }: HeroSectionProps) {
  const content = heroContent?.[variant] ?? heroContent.privacy;

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content?.image ?? ""}
          alt="ED Fence Co - Professional Fencing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-navy-dark/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white/90 font-medium">400+ 5-Star Reviews</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {content?.headline ?? ""}
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {content?.subheadline ?? ""}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white">
                <Shield className="w-6 h-6 text-orange" />
                <span>Lifetime Warranty on Vinyl</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-6 h-6 text-orange" />
                <span>23+ Years Experience</span>
              </div>
            </div>

            <a
              href="tel:5088810910"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-white/30"
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">(508) 881-0910</span>
            </a>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-navy mb-2">Get Your Free Quote</h2>
              <p className="text-gray-600">Fill out the form and we&apos;ll call you back</p>
            </div>
            <CallbackForm campaign={variant} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

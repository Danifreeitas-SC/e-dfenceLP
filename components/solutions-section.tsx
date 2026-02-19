"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Eye, DollarSign, Sparkles } from "lucide-react";

const solutions = [
  {
    title: "Vinyl Privacy Fencing",
    tagline: "The Privacy Champion",
    description: "Complete visual blocking and winter-resistant. Perfect for Massachusetts weather.",
    icon: Eye,
    image: "https://diggerspecialties.com/wp-content/uploads/Superior-WHT-0000-scaled.jpg",
  },
  {
    title: "Secure Chain Link",
    tagline: "Best Value for Pets",
    description: "Durable containment at an affordable price. Keeps your pets safe year-round.",
    icon: DollarSign,
    image: "https://tcfence.com/wp-content/uploads/sites/4/2025/07/Chain-Link-scaled.webp",
  },
  {
    title: "Ornamental Aluminum",
    tagline: "Style Meets Security",
    description: "Keep large animals out without blocking your property view. Elegant and effective.",
    icon: Sparkles,
    image: "https://easternornamentalfence.com/wp-content/uploads/2020/09/EO54202-BZ-54-Inch-High-Bronze-Eastern-Ornamental-Aluminum-Fence-0002.jpg",
  },
];

export default function SolutionsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Specialized Solutions for Every Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We have the right material for your specific situation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {(solutions ?? []).map((solution, index) => {
            const Icon = solution?.icon ?? Eye;
            return (
              <motion.div
                key={solution?.title ?? index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={solution?.image ?? ""}
                    alt={solution?.title ?? "Fence solution"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 bg-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                      <Icon className="w-4 h-4" />
                      {solution?.tagline ?? ""}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{solution?.title ?? ""}</h3>
                  <p className="text-gray-600">{solution?.description ?? ""}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

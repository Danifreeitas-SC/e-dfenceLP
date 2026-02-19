"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Michael R.",
    location: "Shrewsbury, MA",
    text: "ED Fence did an amazing job on our vinyl privacy fence. The crew was professional, clean, and finished ahead of schedule. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah T.",
    location: "Worcester, MA",
    text: "After dealing with deer destroying our garden for years, ED Fence installed the perfect solution. No more wildlife problems!",
    rating: 5,
  },
  {
    name: "David & Lisa M.",
    location: "Westborough, MA",
    text: "Our dogs are finally safe in the backyard. The chain link fence is sturdy and looks great. Best investment we made!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/google-reviews.png"
              alt="Google 5 Star Customer Rating"
              width={180}
              height={120}
              className="h-24 w-auto"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            What Our Neighbors Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied homeowners across Massachusetts
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {(testimonials ?? []).map((testimonial, index) => (
            <motion.div
              key={testimonial?.name ?? index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-gray-50 rounded-xl p-6 relative hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="w-10 h-10 text-orange/20 absolute top-4 right-4" />
              <div className="flex mb-4">
                {[...Array(testimonial?.rating ?? 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial?.text ?? ""}&rdquo;
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-navy">{testimonial?.name ?? ""}</p>
                <p className="text-gray-500 text-sm">{testimonial?.location ?? ""}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

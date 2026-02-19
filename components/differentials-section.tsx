"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Shield, Award, Flag } from "lucide-react";
import { useEffect, useState } from "react";

const differentials = [
  {
    icon: Clock,
    title: "23+ Years of Experience",
    description: "Deep knowledge of Massachusetts soil and climate conditions.",
    number: 23,
    suffix: "+",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty on Vinyl",
    description: "All vinyl fences come with a lifetime warranty.",
    number: 100,
    suffix: "%",
  },
  {
    icon: Award,
    title: "3-Year Labor Warranty",
    description: "Our installation is built to last.",
    number: 3,
    suffix: " YR",
  },
  {
    icon: Flag,
    title: "100% American Made",
    description: "High-quality materials, no fragile imports.",
    number: 100,
    suffix: "%",
  },
];

function AnimatedNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{count}{suffix}</span>;
}

export default function DifferentialsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-20 bg-navy" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The E&D Fencing <span className="text-orange">Standard</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Why choose us over the competition?
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(differentials ?? []).map((diff, index) => {
            const Icon = diff?.icon ?? Clock;
            return (
              <motion.div
                key={diff?.title ?? index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  <AnimatedNumber target={diff?.number ?? 0} suffix={diff?.suffix ?? ""} inView={inView} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{diff?.title ?? ""}</h3>
                <p className="text-white/70 text-sm">{diff?.description ?? ""}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

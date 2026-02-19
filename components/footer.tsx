"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="E&D Fencing Inc. Logo"
                width={120}
                height={60}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <div className="space-y-3">
              <a href="tel:5088810910" className="flex items-center gap-3 hover:text-orange transition-colors">
                <Phone className="w-5 h-5 text-orange" />
                (508) 881-0910
              </a>
              <a href="mailto:office@edfenceco.com" className="flex items-center gap-3 hover:text-orange transition-colors">
                <Mail className="w-5 h-5 text-orange" />
                office@edfenceco.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                <span>235B Hartford Turnpike, Shrewsbury, MA</span>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-xl font-bold mb-4">Service Areas</h3>
            <div className="space-y-2">
              <p className="text-white/90 font-medium">All of Massachusetts</p>
              <p className="text-white/70 text-sm">Proudly serving residential and commercial clients across the entire state.</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <div className="space-y-3 text-white/70">
              <div>
                <p className="text-white/90 font-medium text-sm">Winter</p>
                <p>Mon - Fri: 8:00 AM - 4:00 PM</p>
                <p>Sat & Sun: Closed</p>
              </div>
              <div>
                <p className="text-white/90 font-medium text-sm">After Winter</p>
                <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                <p>Sat: 8:00 AM - 12:00 PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} ED Fence Co. All rights reserved. | Licensed & Insured
          </p>
        </div>
      </div>
    </footer>
  );
}

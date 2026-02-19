import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SolutionsSection from "@/components/solutions-section";
import DifferentialsSection from "@/components/differentials-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export const metadata = {
  title: "Wildlife Control Fencing | E&D Fencing Inc. - Keep Deer & Coyotes Out",
  description: "Protect your landscape and peace of mind. Our specialized fencing stops deer, coyotes, and other local wildlife from invading your property. 23+ years experience in Massachusetts.",
};

export default function WildlifePage() {
  return (
    <main>
      <Header />
      <HeroSection variant="wildlife" />
      <SolutionsSection />
      <DifferentialsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}

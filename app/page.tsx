import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SolutionsSection from "@/components/solutions-section";
import DifferentialsSection from "@/components/differentials-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection variant="privacy" />
      <SolutionsSection />
      <DifferentialsSection />
      <TestimonialsSection />
      <div id="quote">
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}

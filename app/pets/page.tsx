import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SolutionsSection from "@/components/solutions-section";
import DifferentialsSection from "@/components/differentials-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export const metadata = {
  title: "Pet Safety Fencing | E&D Fencing Inc. - Protect Your Furry Family",
  description: "Stop worrying about predators or escapes. Create a safe haven where your pets can play freely and securely all year round. 23+ years experience in Massachusetts.",
};

export default function PetsPage() {
  return (
    <main>
      <Header />
      <HeroSection variant="pets" />
      <SolutionsSection />
      <DifferentialsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}

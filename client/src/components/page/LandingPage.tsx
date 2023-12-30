import HeroSection from "../hero/HeroSection.tsx";
import Footer from "../footer/Footer.tsx";

export function LandingPage() {
  return (
    <div>
      <div className="landing-container">
        <HeroSection />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;

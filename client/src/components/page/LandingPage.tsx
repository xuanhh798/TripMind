import HeroSection from "../hero/HeroSection.tsx";
import Footer from "../footer/Footer.tsx";

export function LandingPage() {
  return (
    <div>
      <div className="p-4 sm:p-8 flex flex-col max-w-6xl mx-auto">
        <HeroSection />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPage;

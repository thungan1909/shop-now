import DressStyleSection from "./DressStyleSection";
import HeroSection from "./HeroSection";
import NewsletterSection from "./NewsletterSection";
import ProductSection from "./ProductSection";
import TestimonialsSection from "./TestimonialsSection";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <ProductSection title="New Arrivals" type="new" />
      <ProductSection title="Top Selling" type="top" />
      <DressStyleSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;

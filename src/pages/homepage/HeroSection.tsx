import heroImage from "../../assets/hero.png";
import { motion } from "framer-motion";
import CButton from "../../components/atoms/CButton/CButton";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-white">
      {/* Decorative illustration on the right */}
      <motion.img
        src={heroImage}
        alt="Shopping illustration"
        className="absolute right-0 bottom-0 w-[550px] object-contain pointer-events-none"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-lg">
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover Products That <br />
            Match Your <span className="text-pink-500">Lifestyle</span>
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-8 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            From fashion and electronics to home essentials — explore millions
            of items from top brands, all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CButton size="medium">Start Shopping</CButton>
          </motion.div>

          <div className="flex gap-8 mt-10 text-sm text-gray-600">
            <div>
              <strong className="text-black text-lg">1M+</strong>
              <br />
              Products Available
            </div>
            <div>
              <strong className="text-black text-lg">50K+</strong>
              <br />
              Verified Sellers
            </div>
            <div>
              <strong className="text-black text-lg">10M+</strong>
              <br />
              Happy Customers
            </div>
          </div>
        </div>
      </div>

      {/* Decorative colored blur shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-pink-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-10 right-40 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-50" />
    </section>
  );
};

export default HeroSection;

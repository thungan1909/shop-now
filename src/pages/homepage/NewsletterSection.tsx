const NewsletterSection = () => {
  return (
    <section className="bg-black text-white py-10 w-full text-center">
      <h3 className="text-2xl font-bold mb-4">
        Stay up to date about our latest offers
      </h3>
      <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full rounded-full px-4 py-3 text-black outline-none"
        />
        <button className="bg-white text-black font-medium rounded-full px-6 py-3 hover:bg-gray-200 transition">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default NewsletterSection;

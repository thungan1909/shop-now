const testimonials = [
  { name: "Sophie L.", rating: 5, comment: "Love the quality and fit!" },
  { name: "Jack D.", rating: 4, comment: "Stylish and affordable!" },
  { name: "James L.", rating: 5, comment: "Fast delivery and great fabric!" },
];

const TestimonialsSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">
        Our Happy Customers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <p className="text-yellow-500 mb-2">{"★".repeat(t.rating)}</p>
            <p className="text-gray-700 mb-4 italic">"{t.comment}"</p>
            <p className="font-semibold">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

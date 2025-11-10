const styles = [
  { label: "Product", img: "/images/style-Product.jpg" },
  { label: "Formal", img: "/images/style-formal.jpg" },
  { label: "Party", img: "/images/style-party.jpg" },
  { label: "Gym", img: "/images/style-gym.jpg" },
];

const DressStyleSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 rounded-3xl">
      <h2 className="text-2xl font-bold text-center mb-8">
        Browse by Dress Style
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {styles.map((s) => (
          <div
            key={s.label}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src={s.img}
              alt={s.label}
              className="w-full h-48 object-cover group-hover:scale-105 transition"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-semibold text-lg">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DressStyleSection;

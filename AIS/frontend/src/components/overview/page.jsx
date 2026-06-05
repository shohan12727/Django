// Place this inside a new file: src/components/home/BusinessOverview.jsx
// Or paste it directly into your main homepage layout file

const stats = [
  { id: 1, name: "Laptops Delivered nationwide", value: "15,000+" },
  { id: 2, name: "Verified Five-Star Reviews", value: "4.9 / 5.0" },
  { id: 3, name: "Active Service Centers", value: "12" },
  { id: 4, name: "Years of Tech Expertise", value: "8+" },
];

export default function BusinessOverview() {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Text Left Column */}
          <div className="lg:col-span-1 space-y-4 text-center lg:text-left">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
              Our Journey
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Bangladesh's Trusted Laptop Partner
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We started with a simple mission: to make authentic, high-quality computing tech accessible to students, creators, and professionals alike.
            </p>
          </div>

          {/* Stats Grid Right Column */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div 
                key={stat.id} 
                className="bg-gray-50 border border-gray-100 p-6 rounded-xl flex flex-col justify-center items-center lg:items-start text-center lg:text-left hover:border-blue-200 transition duration-200 group"
              >
                <span className="text-3xl md:text-4xl font-extrabold text-gray-900 group-hover:text-blue-600 transition duration-150">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-gray-500 mt-2 uppercase tracking-wider">
                  {stat.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
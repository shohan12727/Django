export default function AboutPage() {
  const milestones = [
    { year: "2023", title: "The Spark", desc: "Started as a small tech-blog and online community assisting students in picking the right hardware." },
    { year: "2024", title: "Going Official", desc: "Launched our full catalog with localized delivery tracking, partnering directly with certified distributors." },
    { year: "2025", title: "Countrywide Reach", desc: "Expanded secure, insured courier logistics to all 64 districts across Bangladesh." },
    { year: "2026", title: "The Next Level", desc: "Migrating to an advanced, high-performance web platform to deliver automated checkout and instant technical support." },
  ];

  return (
    <div className="space-y-20 py-4 max-w-5xl mx-auto">
      
      {/* 1. HEADER HERO */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
          Who We Are
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Empowering Your Ambitions Through Technology
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
          We believe that a laptop isn't just a piece of plastic and copper—it’s a gateway to learning code, launching businesses, rendering masterpieces, and conquering virtual battlegrounds.
        </p>
      </section>

      {/* 2. MISSION & VISION CORE CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Mission Card */}
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm flex flex-col space-y-4 hover:border-blue-200 transition">
          <div className="text-3xl bg-blue-50 h-14 w-14 flex items-center justify-center rounded-xl text-blue-600">
            🎯
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Our Mission</h2>
          <p className="text-sm text-gray-600 leading-relaxed flex-grow">
            To provide students, developers, and creators across the country with seamless access to 100% authentic, high-performance computing hardware. We bridge the gap between global innovations and local accessibility while offering reliable post-purchase warranty assurance.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm flex flex-col space-y-4 hover:border-blue-200 transition">
          <div className="text-3xl bg-purple-50 h-14 w-14 flex items-center justify-center rounded-xl text-purple-600">
            👁️
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Our Vision</h2>
          <p className="text-sm text-gray-600 leading-relaxed flex-grow">
            To become the premier tech-retail ecosystem in the region, recognized for absolute product transparency, elite customer support infrastructure, and a trusted community that supports tech progression from the ground up.
          </p>
        </div>

      </section>

      {/* 3. STATIC HISTORICAL TIMELINE */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
            How We Got Here
          </h2>
          <p className="text-sm text-gray-500">
            A quick glimpse into our milestones and continuous growth.
          </p>
        </div>

        {/* Timeline Grid layout */}
        <div className="relative border-l border-gray-200 ml-4 md:ml-32 space-y-8">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="relative pl-6 group">
              
              {/* Timeline Indicator Node */}
              <div className="absolute -left-1.5 top-1.5 bg-gray-200 border-4 border-white h-4 w-4 rounded-full group-hover:bg-blue-600 transition duration-200" />
              
              {/* Year Label Float Left (Desktop Only) */}
              <div className="hidden md:block absolute -left-28 top-0.5 text-right w-20 font-extrabold text-lg text-gray-400 group-hover:text-blue-600 transition duration-200">
                {milestone.year}
              </div>

              {/* Box Content Card */}
              <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm hover:shadow-md transition max-w-2xl">
                {/* Mobile Year Badge */}
                <span className="inline-block md:hidden bg-blue-50 text-blue-600 font-bold text-xs px-2 py-0.5 rounded mb-2">
                  {milestone.year}
                </span>
                <h3 className="font-bold text-gray-900 text-base">{milestone.title}</h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{milestone.desc}</p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. VALUES CORE STRIP */}
      <section className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center space-y-6">
        <h3 className="text-xl font-bold tracking-tight">Our Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-800">
            <span className="text-xl block mb-2">🤝</span>
            <h4 className="font-semibold text-white">Absolute Integrity</h4>
            <p className="text-xs text-gray-400 mt-1">Zero clones, zero configuration tampering, 100% genuine specifications.</p>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-800">
            <span className="text-xl block mb-2">⚡</span>
            <h4 className="font-semibold text-white">Customer Velocity</h4>
            <p className="text-xs text-gray-400 mt-1">Fast answers, quick deliveries, and rapid service solutions.</p>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-800">
            <span className="text-xl block mb-2">🌱</span>
            <h4 className="font-semibold text-white">Community Driven</h4>
            <p className="text-xs text-gray-400 mt-1">Sponsoring and giving back to tech clubs, workshops, and hackathons.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
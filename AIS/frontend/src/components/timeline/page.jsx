export default function TimelinePage() {
  const roadmapItems = [
    {
      year: "2023",
      title: "The Vision & Community Launch",
      icon: "🌱",
      status: "Completed",
      description: "Started as a small online community helping tech students, developers, and local engineering clubs select the perfect hardware configurations for their specific compiling and development workloads.",
    },
    {
      year: "2024",
      title: "Official Tech Partnerships",
      icon: "🤝",
      status: "Completed",
      description: "Formed strategic partnerships with authorized national brand distributors to guarantee 100% authentic, brand-new sealed laptops with intact international manufacturer warranties.",
    },
    {
      year: "2025",
      title: "Nationwide Safe-Logistics Integration",
      icon: "🚚",
      status: "Completed",
      description: "Successfully expanded our secure, premium insured courier delivery network across all 64 districts in Bangladesh, establishing a reliable 24-48 hour fulfillment window for metro regions.",
    },
    {
      year: "2026",
      title: "Next-Gen Web Platform & Automated Systems",
      icon: "⚡",
      status: "In Progress",
      description: "Migrating our core frontend interface to an optimized Next.js App Router framework. Preparing automated live-inventory tracking and structural web features to handle future backend API rollouts.",
    },
    {
      year: "2027",
      title: "Physical Tech Experience Centers",
      icon: "🏢",
      status: "Future Goal",
      description: "Planning the launch of dedicated physical experience hubs where customers can test thermals, keyboard key-travel, and display quality firsthand before making a purchase.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
          Our Roadmap
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          The Journey of LaptopShop
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          From a grassroots community initiative to building a modern, reliable tech-retail pipeline. Explore our historical milestones and future objectives.
        </p>
      </div>

      {/* Main Vertical Timeline Container */}
      <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 ml-6 space-y-12 py-4">
        
        {roadmapItems.map((item, index) => {
          const isInProgress = item.status === "In Progress";
          const isFuture = item.status === "Future Goal";

          return (
            <div key={index} className="relative pl-8 md:pl-10 group">
              
              {/* Vertical Timeline Circular Node Indicator */}
              <div 
                className={`absolute -left-[17px] top-1.5 h-8 w-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-sm transition-transform duration-300 group-hover:scale-110 z-10 ${
                  isFuture 
                    ? "bg-gray-100 text-gray-400" 
                    : isInProgress 
                    ? "bg-blue-100 text-blue-600 animate-pulse" 
                    : "bg-blue-600 text-white"
                }`}
              >
                {item.icon}
              </div>

              {/* Event Content Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition duration-300 space-y-3">
                
                {/* Meta Row: Year and Status Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-lg font-black tracking-tight ${isFuture ? "text-gray-400" : "text-blue-600"}`}>
                    {item.year}
                  </span>
                  
                  <span 
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                      isFuture 
                        ? "bg-gray-50 text-gray-400 border-gray-200" 
                        : isInProgress 
                        ? "bg-amber-50 text-amber-600 border-amber-200" 
                        : "bg-green-50 text-green-600 border-green-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition duration-150">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}
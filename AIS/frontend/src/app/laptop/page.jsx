"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function LaptopsPage() {
  const router = useRouter();
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortVal, setSortVal] = useState("default");

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/laptops/");
        const data = await res.json();
        setLaptops(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaptops();
  }, []);

  const filtered = useMemo(() => {
    let src = [...laptops];
    if (activeFilter === "featured") src = src.filter((l) => l.is_featured);
    else if (activeFilter === "available") src = src.filter((l) => l.is_available);
    if (sortVal === "price-asc") src.sort((a, b) => a.price - b.price);
    else if (sortVal === "price-desc") src.sort((a, b) => b.price - a.price);
    else if (sortVal === "name") src.sort((a, b) => a.name.localeCompare(b.name));
    return src;
  }, [laptops, activeFilter, sortVal]);

  function discountPct(price, original) {
    if (!original || original <= price) return null;
    return Math.round((1 - price / original) * 100);
  }

  function formatStorage(size) {
    return size >= 1000 ? `${size / 1000}TB` : `${size}GB`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50">
        <svg className="w-10 h-10 text-gray-300 animate-pulse" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="12" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
          <rect x="2" y="44" width="60" height="4" rx="2" fill="currentColor" opacity=".3" />
        </svg>
        <p className="text-sm text-gray-400 tracking-widest uppercase">Loading laptops…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-1">
            Browse inventory
          </p>
          <h1 className="font-serif text-5xl font-normal text-gray-900 leading-tight mb-2">
            Laptop <br />
            <em>Collection</em>
          </h1>
          <p className="text-sm text-gray-500">
            {laptops.length} models available
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {[
            { label: "All", value: "all" },
            { label: "Featured", value: "featured" },
            { label: "In Stock", value: "available" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all ${
                activeFilter === f.value
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-transparent text-gray-500 border-gray-300 hover:border-gray-500"
              }`}
            >
              {f.label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort</span>
            <select
              value={sortVal}
              onChange={(e) => setSortVal(e.target.value)}
              className="text-xs text-gray-700 bg-transparent border border-gray-300 rounded-md px-2 py-1.5 cursor-pointer focus:outline-none"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-gray-400 mb-6">
          Showing {filtered.length} of {laptops.length} models
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400 text-sm">
            No laptops match this filter.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((laptop) => {
              const pct = discountPct(laptop.price, laptop.discount_price);
              return (
                <div
                  key={laptop.id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative bg-gray-50 h-44 flex items-center justify-center overflow-hidden">
                    {laptop.main_image ? (
                      <img
                        src={laptop.main_image}
                        alt={laptop.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-14 h-14 text-gray-200" viewBox="0 0 64 64" fill="none">
                        <rect x="8" y="12" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                        <rect x="2" y="44" width="60" height="4" rx="2" fill="currentColor" opacity=".4" />
                        <rect x="24" y="46" width="16" height="2" rx="1" fill="currentColor" opacity=".6" />
                      </svg>
                    )}

                    <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start pointer-events-none">
                      <span>
                        {laptop.is_featured && (
                          <span className="text-[10px] font-semibold tracking-wide uppercase bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </span>
                      <span>
                        {!laptop.is_available && (
                          <span className="text-[10px] font-semibold tracking-wide uppercase bg-red-100 text-red-700 px-2.5 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-1">
                      {laptop.brand}
                    </p>
                    <h2 className="font-serif text-lg font-normal text-gray-900 leading-snug mb-3">
                      {laptop.name}
                    </h2>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-3">
                      {[
                        { label: "RAM", value: `${laptop.ram_size} GB` },
                        { label: "Storage", value: `${formatStorage(laptop.storage_size)} ${laptop.storage_type}` },
                        { label: "Display", value: `${laptop.display_size}"` },
                        { label: "CPU", value: laptop.processor_brand },
                      ].map((spec) => (
                        <div key={spec.label}>
                          <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                            {spec.label}
                          </p>
                          <p className="text-xs font-medium text-gray-800 truncate">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <hr className="border-gray-100 mb-3" />

                    {/* Price */}
                    <div className="flex items-end gap-2 mb-3">
                      <span className="font-serif text-2xl text-gray-900">
                        ${Number(laptop.price).toLocaleString()}
                      </span>
                      {laptop.discount_price && laptop.discount_price > laptop.price && (
                        <span className="text-xs text-gray-400 line-through mb-0.5">
                          ${Number(laptop.discount_price).toLocaleString()}
                        </span>
                      )}
                      {pct && (
                        <span className="ml-auto text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                          −{pct}%
                        </span>
                      )}
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => router.push(`/laptop/${laptop.id}`)}
                      disabled={!laptop.is_available}
                      className={`w-full py-2.5 text-xs font-semibold tracking-widest uppercase rounded-lg transition-opacity ${
                        laptop.is_available
                          ? "bg-gray-900 text-white hover:opacity-80"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {laptop.is_available ? "View Details" : "Unavailable"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
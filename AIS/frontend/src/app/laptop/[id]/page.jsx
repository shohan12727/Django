"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LaptopDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    discount_price: "",
    ram_size: "",
    storage_size: "",
    storage_type: "",
    display_size: "",
    processor_brand: "",
    is_featured: false,
    is_available: true,
  });

  // Check authentication and redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      const currentPath = `/laptop/${id}`;
      router.push(`/pages/login?returnUrl=${encodeURIComponent(currentPath)}`);
    }
  }, [isAuthenticated, authLoading, router, id]);

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/laptops/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch laptop");
        const data = await res.json();
        setLaptop(data);
        setFormData({
          name: data.name || "",
          brand: data.brand || "",
          price: data.price || "",
          discount_price: data.discount_price || "",
          ram_size: data.ram_size || "",
          storage_size: data.storage_size || "",
          storage_type: data.storage_type || "",
          display_size: data.display_size || "",
          processor_brand: data.processor_brand || "",
          is_featured: data.is_featured || false,
          is_available: data.is_available !== undefined ? data.is_available : true,
        });
      } catch (error) {
        console.error(error);
        setError("Failed to load laptop details");
      } finally {
        setLoading(false);
      }
    };
    fetchLaptop();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/laptops/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || data.message || JSON.stringify(data) || "Failed to update laptop");
      }
      setLaptop(data);
      setFormData(data);
      setIsEditing(false);
      setSuccessMsg("Laptop updated successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message || "Failed to update laptop");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this laptop?")) return;

    setIsDeleting(true);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/laptops/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete laptop");
      setSuccessMsg("Laptop deleted successfully!");
      setTimeout(() => router.push("/laptop"), 1500);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete laptop");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="w-10 h-10 text-gray-300 animate-pulse mx-auto" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="12" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
            <rect x="2" y="44" width="60" height="4" rx="2" fill="currentColor" opacity=".3" />
          </svg>
          <p className="text-sm text-gray-400 tracking-widest uppercase mt-3">Loading details…</p>
        </div>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Laptop not found</p>
          <button
            onClick={() => router.push("/laptop")}
            className="text-sm font-semibold text-gray-900 hover:text-gray-600"
          >
            Back to Laptops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/laptop")}
          className="mb-8 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          ← Back to Laptops
        </button>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {successMsg}
          </div>
        )}

        {/* Header with Actions */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-1">
              {laptop.brand}
            </p>
            <h1 className="font-serif text-4xl font-normal text-gray-900 mb-2">
              {laptop.name}
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* Image Section */}
          <div className="bg-gray-50 h-96 flex items-center justify-center overflow-hidden">
            {laptop.main_image ? (
              <img
                src={laptop.main_image}
                alt={laptop.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-24 h-24 text-gray-200" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="12" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                <rect x="2" y="44" width="60" height="4" rx="2" fill="currentColor" opacity=".4" />
              </svg>
            )}
          </div>

          {/* Details Section */}
          <div className="p-8">
            {isEditing ? (
              // Edit Form
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Laptop Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Discount Price ($)</label>
                    <input
                      type="number"
                      name="discount_price"
                      value={formData.discount_price || ""}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">RAM Size (GB)</label>
                    <input
                      type="number"
                      name="ram_size"
                      value={formData.ram_size || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Storage Size</label>
                    <input
                      type="number"
                      name="storage_size"
                      value={formData.storage_size || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Storage Type</label>
                    <input
                      type="text"
                      name="storage_type"
                      value={formData.storage_type || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., SSD, HDD"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Display Size (inches)</label>
                    <input
                      type="text"
                      name="display_size"
                      value={formData.display_size || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., 15.6"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Processor Brand</label>
                    <input
                      type="text"
                      name="processor_brand"
                      value={formData.processor_brand || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., Intel i7"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_featured"
                        checked={formData.is_featured || false}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-gray-700">Mark as Featured</span>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_available"
                        checked={formData.is_available !== false}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-gray-700">In Stock</span>
                    </label>
                  </div>

                  <div className="md:col-span-2 flex gap-3">
                    <button
                      onClick={handleUpdate}
                      disabled={isSaving}
                      className="flex-1 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gray-400 mb-1">
                    Price
                  </p>
                  <p className="text-3xl font-serif text-gray-900">
                    ${Number(laptop.price).toLocaleString()}
                  </p>
                  {laptop.discount_price && laptop.discount_price > laptop.price && (
                    <p className="text-xs text-gray-400 line-through mt-1">
                      ${Number(laptop.discount_price).toLocaleString()}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gray-400 mb-1">
                    Status
                  </p>
                  <div className="flex gap-2">
                    {laptop.is_featured && (
                      <span className="text-xs font-semibold tracking-wide uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                    <span
                      className={`text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${
                        laptop.is_available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {laptop.is_available ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <hr className="md:col-span-2 border-gray-200 my-6" />

                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">
                    RAM
                  </p>
                  <p className="text-lg font-medium text-gray-900">{laptop.ram_size} GB</p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">
                    Storage
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {laptop.storage_size >= 1000
                      ? `${laptop.storage_size / 1000}TB`
                      : `${laptop.storage_size}GB`}{" "}
                    {laptop.storage_type}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">
                    Display
                  </p>
                  <p className="text-lg font-medium text-gray-900">{laptop.display_size}"</p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gray-400 mb-2">
                    Processor
                  </p>
                  <p className="text-lg font-medium text-gray-900">{laptop.processor_brand}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

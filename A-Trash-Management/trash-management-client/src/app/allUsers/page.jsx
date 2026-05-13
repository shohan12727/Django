"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, User, FileText, Loader2 } from "lucide-react";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:9000/api/auth/register/", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();

      setUsers(data.users || []);
      setTotalUsers(data.total_users || 0);

    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Robust image resolver
  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === "null") {
      return "/default-user.png";
    }

    // already full URL
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // normalize missing slash issues
    return `http://127.0.0.1:9000${imagePath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            All Registered Users
          </h1>

          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
            Total Users: {totalUsers}
          </div>
        </div>

        {/* Empty state */}
        {users.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No users found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
              >

                {/* PROFILE IMAGE */}
                <div className="flex justify-center mb-4">
                  <img
                    src={getImageUrl(user.profile_image)}
                    alt={user.username}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                    onError={(e) => {
                      e.target.src = "/default-user.png";
                    }}
                  />
                </div>

                {/* USER INFO */}
                <div className="space-y-3">

                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <User size={18} />
                    {user.username}
                  </h2>

                  <p className="text-gray-600 flex items-center gap-2">
                    <Mail size={16} />
                    {user.email}
                  </p>

                  <p className="text-gray-600 flex items-center gap-2">
                    <Phone size={16} />
                    {user.phone || "No phone added"}
                  </p>

                  <p className="text-gray-600 flex items-start gap-2">
                    <FileText size={16} className="mt-1" />
                    {user.bio || "No bio available"}
                  </p>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children, redirectTo = "/pages/login" }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Get current path for redirect after login
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
      const returnUrl = currentPath ? `?returnUrl=${encodeURIComponent(currentPath)}` : "";
      router.push(`${redirectTo}${returnUrl}`);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

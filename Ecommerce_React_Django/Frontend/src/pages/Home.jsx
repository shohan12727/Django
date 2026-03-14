import { useState } from "react";

const BASE_URL = "http://127.0.0.1:8000/api/chatbot";

export default function Home() {
  const [form, setForm] = useState({
    patient_name: "",
    symptoms: "",
    diagnosis: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patient_name.trim() || !form.symptoms.trim()) {
      setError("Patient name and symptoms are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${BASE_URL}/generate-summary/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white border rounded-lg p-6">

        <h1 className="text-xl font-semibold mb-4">
          Patient  Summary
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border p-2 rounded"
            name="patient_name"
            placeholder="Patient Name"
            value={form.patient_name}
            onChange={handleChange}
          />

          <input
            className="w-full border p-2 rounded"
            name="diagnosis"
            placeholder="Diagnosis (optional)"
            value={form.diagnosis}
            onChange={handleChange}
          />

          <textarea
            className="w-full border p-2 rounded"
            name="symptoms"
            placeholder="Symptoms"
            rows="4"
            value={form.symptoms}
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>

        </form>

        {result && (
          <div className="mt-6 space-y-4">

            <div>
              <h2 className="font-semibold">Summary</h2>
              <p className="text-sm text-gray-600">{result.ai_summary}</p>
            </div>

            <div>
              <h2 className="font-semibold">Suggestions</h2>
              <p className="text-sm text-gray-600">{result.ai_suggestion}</p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
// Place this inside a new file: src/components/home/FAQ.jsx
"use client";

import { useState } from "react";

const faqData = [
  {
    question: "Are your laptops fully authentic and come with official warranties?",
    answer: "Yes, absolutely. Every laptop sold on our platform is 100% authentic, sourced directly from official brand distributors. They come accompanied by official manufacturer brand warranty certificates valid locally."
  },
  {
    question: "Do you offer home delivery outside the major cities?",
    answer: "We offer secure, insured courier delivery to all 64 districts across the country. Metro orders are delivered within 24–48 hours, while district deliveries generally take 3–4 business days."
  },
  {
    question: "What is your return and replacement policy?",
    answer: "We provide a hassle-free 7-day replacement policy. If your machine shows any manufacturing defects or hardware errors within the first 7 days, we will swap it out for a brand-new unit immediately."
  },
  {
    question: "Can I upgrade my RAM or storage through your shop directly?",
    answer: "Yes, we provide customization options for upgradeable variants! You can choose your hardware upgrades directly on the dynamic product pages, or get it upgraded post-purchase at any of our physical support centers."
  }
];

export default function FAQ() {
  // Tracks which FAQ index is open. Set to null so they are all closed by default.
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="space-y-6 max-w-4xl mx-auto py-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
          Got Questions? We Have Answers
        </h2>
        <p className="text-sm text-gray-500">
          Everything you need to know about buying your next machine from us.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => {
          const isOpen = activeIndex === index;
          
          return (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition duration-200"
            >
              {/* Question Header Row */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50/80 transition focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className={`text-xl font-light text-gray-400 transform transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                  ➕
                </span>
              </button>

              {/* Collapsible Answer Pane */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-48 border-t border-gray-100" : "max-h-0"
                }`}
              >
                <p className="p-5 text-sm text-gray-600 leading-relaxed bg-gray-50/30">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
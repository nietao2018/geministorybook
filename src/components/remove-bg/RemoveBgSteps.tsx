'use client';

import React from "react";

const stepData = [
  {
    title: "Upload Image",
    description: "Select an image to remove the background. JPG/PNG format supported, up to 2MB.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "AI Processing",
    description: "Our advanced AI automatically detects and removes the background with precision.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Download Result",
    description: "Preview and download your image with transparent background. Ready to use!",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

export default function RemoveBgSteps() {

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Remove image backgrounds in just 3 simple steps. Fast, accurate, and professional results.
          </p>
        </div>
        
        <div className="relative">
          {/* Step Progress Line */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-800 dark:via-purple-800 dark:to-blue-800 hidden md:block" />
          
          {/* Step Content Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative z-10">
            {stepData.map((stepItem, idx) => (
              <article
                key={stepItem.title}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
                aria-label={stepItem.title}
              >
                {/* Step Number Circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    {idx + 1}
                  </div>
                  {/* Connecting line for mobile */}
                  {idx < stepData.length - 1 && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 md:hidden" />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/80 dark:border-gray-600/50 w-full">
                  {/* Step Image */}
                  <div className="mb-6 relative">
                    <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                      <img
                        src={stepItem.image}
                        alt={stepItem.title.replace(/Step \d+ /, '') + ' example photo'}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    {stepItem.title}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
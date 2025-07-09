'use client';

import React from "react";

const stepData = [
  {
    title: "Enter Text",
    description: "Type or paste your text content. Support up to 1000 characters in multiple languages.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Choose Voice",
    description: "Select your preferred voice, language, and speech speed from our variety of options.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Generate & Download",
    description: "AI converts your text to natural speech. Preview, play, and download the audio file.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
  },
];

export default function TextToSpeechSteps() {

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Convert text to natural speech in just 3 simple steps. Fast, accurate, and professional results.
          </p>
        </div>
        
        <div className="relative">
          {/* Step Progress Line */}
          <div className="absolute left-1/2 top-20 hidden h-0.5 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-green-200 via-blue-200 to-green-200 dark:from-green-800 dark:via-blue-800 dark:to-green-800 md:block" />
          
          {/* Step Content Cards */}
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {stepData.map((stepItem, idx) => (
              <article
                key={stepItem.title}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
                aria-label={stepItem.title}
              >
                {/* Step Number Circle */}
                <div className="relative mb-6">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-xl font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                    {idx + 1}
                  </div>
                  {/* Connecting line for mobile */}
                  {idx < stepData.length - 1 && (
                    <div className="absolute left-1/2 top-full h-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-green-200 to-blue-200 dark:from-green-700 dark:to-blue-700 md:hidden" />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="w-full rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80">
                  {/* Step Image */}
                  <div className="relative mb-6">
                    <div className="mx-auto size-24 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-md dark:from-gray-700 dark:to-gray-800">
                      <img
                        src={stepItem.image}
                        alt={stepItem.title.replace(/Step \d+ /, '') + ' example photo'}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="mb-3 text-xl font-bold text-gray-800 dark:text-gray-200">
                    {stepItem.title}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">
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
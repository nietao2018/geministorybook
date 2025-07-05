import React from "react";

const VideoSection: React.FC = () => (
  <section className="relative overflow-hidden py-20">
    {/* Background effects */}
    <div className="absolute inset-0">
      <div className="absolute left-1/4 top-1/3 size-72 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 size-80 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-3xl" />
    </div>
    
    <div className="relative mx-auto max-w-7xl px-4">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-medium text-gray-700 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-gray-300">
          <span className="size-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          Demo
        </div>
        <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
          See It In Action
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
          Watch how our AI transforms your photos into stunning headshots in seconds
        </p>
      </div>
      
      {/* Video Container */}
      <div className="relative">
        <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-4 shadow-2xl backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <video
              src="https://d1735p3aqhycef.cloudfront.net/official-website/public/tools/main_page.mp4"
              controls
              autoPlay
              muted
              loop
              className="size-full object-cover"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect width='1200' height='600' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%236b7280'%3ELoading demo video...%3C/text%3E%3C/svg%3E"
            />
            
            {/* Play button overlay for better UX */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="rounded-full bg-white/90 p-4 shadow-lg">
                <svg className="size-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute -left-4 -top-4 size-8 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-60" />
        <div className="absolute -bottom-4 -right-4 size-6 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-40" style={{animationDelay: '1s'}} />
      </div>
    </div>
  </section>
);

export default VideoSection; 
import React from "react";
import Link from "next/link";
import { config } from "./config";

export default function RemoveBGFeature() {
  // 收集所有mainNav中的featureTitle和path
  const features = config.mainNav
    .filter(item => item.featureTitle && item.path)
    .map(item => ({
      title: item.featureTitle,
      path: `/remove-bg${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    }));

  return (
    <section aria-labelledby="steps-section-title" className="w-full py-12">
      <h2
        className="mb-12 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-center text-4xl font-extrabold tracking-wider text-transparent drop-shadow-lg"
      >
        Discover More Background Remover Use Cases
      </h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, idx) => (
          <Link
            key={idx}
            href={feature.path}
            className="group relative rounded-3xl bg-gradient-to-br from-purple-300 via-blue-200 to-pink-200 p-[2px] shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:from-purple-900 dark:via-zinc-800 dark:to-pink-900"
          >
            <div className="flex size-full select-none items-center justify-center rounded-3xl bg-white px-3 py-10 text-center transition-colors duration-200 group-hover:bg-purple-50 dark:bg-zinc-900 dark:group-hover:bg-zinc-800">
              <span className="line-clamp-2 text-base font-semibold leading-snug tracking-wide text-gray-900 dark:text-gray-100 md:text-lg">
                {feature.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

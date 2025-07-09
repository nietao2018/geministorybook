'use client';

import React from "react";
import { useParams } from 'next/navigation';

const stepData = [
  {
    title: {
      en: "Upload Image",
      zh: "上传图片"
    },
    description: {
      en: "Select an image to compress. JPG/PNG/WebP format supported, up to 10MB.",
      zh: "选择要压缩的图片。支持JPG/PNG/WebP格式，最大10MB。"
    },
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: {
      en: "AI Processing",
      zh: "AI处理"
    },
    description: {
      en: "Our advanced AI optimizes your image while preserving quality and reducing file size.",
      zh: "我们先进的AI在保持画质的同时优化您的图片并减小文件大小。"
    },
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: {
      en: "Download Result",
      zh: "下载结果"
    },
    description: {
      en: "Preview and download your optimized image with smaller file size. Ready to use!",
      zh: "预览并下载优化后的图片，文件大小更小。即可使用！"
    },
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

export default function ImageCompressorSteps() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh-hans';

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            {isZh ? '如何工作' : 'How It Works'}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {isZh 
              ? '只需3个简单步骤即可压缩图片。快速、准确、专业的结果。'
              : 'Compress images in just 3 simple steps. Fast, accurate, and professional results.'
            }
          </p>
        </div>
        
        <div className="relative">
          {/* Step Progress Line */}
          <div className="absolute left-1/2 top-20 hidden h-0.5 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-800 dark:via-purple-800 dark:to-blue-800 md:block" />
          
          {/* Step Content Cards */}
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {stepData.map((stepItem, idx) => (
              <article
                key={stepItem.title.en}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
                aria-label={stepItem.title.en}
              >
                {/* Step Number Circle */}
                <div className="relative mb-6">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xl font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                    {idx + 1}
                  </div>
                  {/* Connecting line for mobile */}
                  {idx < stepData.length - 1 && (
                    <div className="absolute left-1/2 top-full h-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 md:hidden" />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="w-full rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80">
                  {/* Step Image */}
                  <div className="relative mb-6">
                    <div className="mx-auto size-24 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-md dark:from-gray-700 dark:to-gray-800">
                      <img
                        src={stepItem.image}
                        alt={stepItem.title.en.replace(/Step \d+ /, '') + ' example photo'}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="mb-3 text-xl font-bold text-gray-800 dark:text-gray-200">
                    {isZh ? stepItem.title.zh : stepItem.title.en}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                    {isZh ? stepItem.description.zh : stepItem.description.en}
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
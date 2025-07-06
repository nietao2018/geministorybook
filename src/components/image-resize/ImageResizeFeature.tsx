"use client";

import React from "react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { config } from "./config";
import { Icons } from "@/components/shared/icons";

export default function ImageResizeFeature() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';
  
  // 收集所有mainNav中的featureTitle和path
  const features = config.mainNav
    .filter(item => item.featureTitle && item.path)
    .map(item => ({
      title: item.featureTitle,
      path: `/image-resize${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
      description: item.subTitle,
      icon: getFeatureIcon(item.path),
    }));

  function getFeatureIcon(path: string) {
    if (path.includes('social-media')) return 'share2';
    if (path.includes('web-banner')) return 'globe';
    if (path.includes('print-media')) return 'file';
    if (path.includes('thumbnail')) return 'video';
    return 'maximize';
  }

  return (
    <section aria-labelledby="image-resize-features-title" className="w-full py-16">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2
          id="image-resize-features-title"
          className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl"
        >
          {isZhHans ? '探索更多图片调整应用场景' : 'Discover More Image Resize Use Cases'}
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
          {isZhHans 
            ? '针对不同平台和用途，我们提供专业的图片尺寸调整解决方案，满足您的各种需求'
            : 'Specialized image resizing solutions for different platforms and purposes, meeting all your professional needs'
          }
        </p>
      </div>

      {/* Features Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, idx) => {
          const Icon = Icons[feature.icon] || Icons.maximize;
          return (
            <Link
              key={idx}
              href={feature.path}
              className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-gray-600/50 dark:bg-gray-800/80"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative p-6">
                {/* Icon */}
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-7" />
                </div>
                
                {/* Content */}
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <span className="text-sm font-medium">
                    {isZhHans ? '了解更多' : 'Learn more'}
                  </span>
                  <Icons.arrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Additional Benefits Section */}
      <div className="mt-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            {isZhHans ? '为什么选择我们的图片调整工具？' : 'Why Choose Our Image Resize Tool?'}
          </h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Icons.zap className="size-6" />
              </div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {isZhHans ? '快速处理' : 'Lightning Fast'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isZhHans ? '秒级处理，即时获得结果' : 'Process images in seconds, get instant results'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <Icons.shield className="size-6" />
              </div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {isZhHans ? '保持画质' : 'Quality Preserved'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isZhHans ? 'AI算法确保最佳画质输出' : 'AI algorithms ensure optimal quality output'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Icons.sliders className="size-6" />
              </div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {isZhHans ? '多种预设' : 'Multiple Presets'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isZhHans ? '覆盖各种使用场景的尺寸预设' : 'Size presets covering all use cases'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
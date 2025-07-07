"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UseCasesProps {
  locale?: string;
}

export default function UseCases({ locale }: UseCasesProps) {
  const isZhHans = locale === 'zh-hans';

  const demoVideos = [
    {
      title: isZhHans ? "城市风景缩放" : "City Landscape Zoom",
      description: isZhHans ? "从繁华都市街景缩放到太空视角，展现城市的宏伟规模" : "Zoom from bustling city streets to space view, showcasing the magnificent scale of urban landscapes",
      videoUrl: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-img/earth-zoom-out-3.mp4",
      posterUrl: "/demo/earth-zoom-city-poster.jpg",
      category: isZhHans ? "城市景观" : "Urban Landscape"
    },
    {
      title: isZhHans ? "自然风光缩放" : "Natural Scenery Zoom",
      description: isZhHans ? "从美丽的自然风景逐渐缩放到地球全景，感受大自然的壮美" : "Gradually zoom from beautiful natural scenery to Earth's panoramic view, experiencing nature's magnificence",
      videoUrl: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-img/earth-zoom-out-4.mp4", 
      posterUrl: "/demo/earth-zoom-nature-poster.jpg",
      category: isZhHans ? "自然风光" : "Natural Scenery"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 py-16 dark:from-gray-800/50 dark:to-gray-900/50">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {isZhHans ? "使用案例展示" : "Use Case Examples"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {isZhHans 
              ? "查看地球缩放视频的精彩效果，从地面细节到宇宙视角的震撼转换"
              : "Explore stunning earth zoom effects, from ground details to cosmic perspective transformations"
            }
          </p>
        </div>

        {/* Demo Videos Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {demoVideos.map((demo, index) => (
            <Card key={index} className="overflow-hidden border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {demo.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">
                      {demo.description}
                    </CardDescription>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {demo.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <video
                    className="h-64 w-full object-cover md:h-80"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={demo.posterUrl}
                    preload="metadata"
                  >
                    <source src={demo.videoUrl} type="video/mp4" />
                    {isZhHans ? "您的浏览器不支持视频播放" : "Your browser does not support video playback"}
                  </video>
                  
                  {/* Video Overlay Info */}
                  <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 text-white backdrop-blur-sm">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="size-2 rounded-full bg-red-500"></span>
                      <span>{isZhHans ? "演示视频" : "Demo Video"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="rounded-2xl border border-blue-200/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80 p-8 backdrop-blur-sm dark:border-blue-700/50 dark:from-blue-900/20 dark:to-purple-900/20">
            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              {isZhHans ? "创建您自己的地球缩放视频" : "Create Your Own Earth Zoom Video"}
            </h3>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
              {isZhHans 
                ? "上传您的图片，我们的AI将为您生成令人震撼的地球缩放效果视频。从地面到太空，展现独特的视觉体验。"
                : "Upload your image and our AI will generate stunning earth zoom effect videos for you. From ground to space, showcasing unique visual experiences."
              }
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <span className="mr-2 text-green-500">✓</span>
                {isZhHans ? "高质量4K输出" : "High-quality 4K output"}
              </span>
              <span className="flex items-center">
                <span className="mr-2 text-green-500">✓</span>
                {isZhHans ? "快速AI处理" : "Fast AI processing"}
              </span>
              <span className="flex items-center">
                <span className="mr-2 text-green-500">✓</span>
                {isZhHans ? "一键下载" : "One-click download"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
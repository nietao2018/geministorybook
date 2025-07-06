"use client";

import React from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";

export default function VideoEnhancementFeatures() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';

  const features = [
    {
      icon: Icons.film,
      title: isZhHans ? "电影级画质提升" : "Cinematic Quality Enhancement",
      description: isZhHans
        ? "将普通视频提升至电影级画质，增强细节、色彩和清晰度，适用于短片、纪录片、广告等专业制作。"
        : "Enhance ordinary videos to cinematic quality with improved details, colors, and clarity. Perfect for short films, documentaries, and professional advertising.",
      tags: [
        isZhHans ? "短片制作" : "Short Film",
        isZhHans ? "纪录片" : "Documentary",
        isZhHans ? "广告制作" : "Advertisement"
      ]
    },
    {
      icon: Icons.camera,
      title: isZhHans ? "老旧视频修复" : "Legacy Video Restoration",
      description: isZhHans
        ? "修复老旧、损坏或低质量的视频文件，恢复丢失的细节，去除噪点和瑕疵，延长珍贵视频的生命力。"
        : "Restore old, damaged, or low-quality video files by recovering lost details, removing noise and artifacts, extending the life of precious videos.",
      tags: [
        isZhHans ? "家庭视频" : "Family Video",
        isZhHans ? "历史影像" : "Historical Footage",
        isZhHans ? "档案修复" : "Archive Restoration"
      ]
    },
    {
      icon: Icons.monitor,
      title: isZhHans ? "直播录制优化" : "Live Stream Optimization",
      description: isZhHans
        ? "优化直播录制画质，提升清晰度和稳定性，去除压缩噪点，适用于游戏直播、教学直播等场景。"
        : "Optimize live stream recording quality with improved clarity and stability, remove compression artifacts. Perfect for gaming streams and educational broadcasts.",
      tags: [
        isZhHans ? "游戏直播" : "Gaming Stream",
        isZhHans ? "教育直播" : "Educational Live",
        isZhHans ? "会议录制" : "Meeting Recording"
      ]
    },
    {
      icon: Icons.smartphone,
      title: isZhHans ? "手机视频增强" : "Mobile Video Enhancement",
      description: isZhHans
        ? "专门针对手机拍摄的视频进行优化，改善手抖、低光噪点、色彩偏差等常见问题，提升移动端视频质量。"
        : "Specially optimized for mobile-shot videos, improving common issues like camera shake, low-light noise, and color deviation to enhance mobile video quality.",
      tags: [
        isZhHans ? "手机拍摄" : "Mobile Recording",
        isZhHans ? "社交媒体" : "Social Media",
        isZhHans ? "短视频" : "Short Video"
      ]
    }
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.purple.500/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.pink.500/0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            {isZhHans ? "视频增强应用场景" : "Video Enhancement Use Cases"}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            {isZhHans
              ? "适用于各种视频制作和修复场景，提升视频质量和观看体验"
              : "Suitable for various video production and restoration scenarios to improve video quality and viewing experience"
            }
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-600/50 dark:bg-gray-800/80"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Features */}
        <div className="mt-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
              {isZhHans ? "AI 增强技术特性" : "AI Enhancement Technology Features"}
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  <Icons.zap className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "超分辨率" : "Super Resolution"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "提升至 4K 分辨率" : "Upscale to 4K resolution"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  <Icons.shield className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "智能降噪" : "AI Denoising"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "自动去除噪点" : "Automatic noise removal"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                  <Icons.palette className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "色彩增强" : "Color Enhancement"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "智能色彩校正" : "Intelligent color correction"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white">
                  <Icons.activity className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "防抖稳定" : "Stabilization"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "消除画面抖动" : "Eliminate camera shake"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {isZhHans ? "开始使用视频增强" : "Start Using Video Enhancement"}
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {isZhHans
                ? "上传您的视频文件，体验AI驱动的专业级视频增强效果"
                : "Upload your video files and experience professional-grade AI-powered video enhancement"
              }
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Icons.check className="size-4 text-green-600" />
                <span>{isZhHans ? "支持多种分辨率输出" : "Multiple resolution outputs"}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Icons.check className="size-4 text-green-600" />
                <span>{isZhHans ? "保持原始帧率" : "Original frame rate maintained"}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Icons.check className="size-4 text-green-600" />
                <span>{isZhHans ? "批量处理支持" : "Batch processing support"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
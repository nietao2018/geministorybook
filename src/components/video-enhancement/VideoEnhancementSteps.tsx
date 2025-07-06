"use client";

import React from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";

export default function VideoEnhancementSteps() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';

  const steps = [
    {
      icon: Icons.upload,
      title: isZhHans ? "上传视频文件" : "Upload Video File",
      description: isZhHans 
        ? "选择您需要增强的视频文件，支持 MP4、MOV、AVI、WebM 等格式。适用于低清晰度、抖动、噪点等各种视频问题。"
        : "Select your video file that needs enhancement. Supports MP4, MOV, AVI, WebM formats. Perfect for low resolution, shaky, noisy videos and various quality issues."
    },
    {
      icon: Icons.settings,
      title: isZhHans ? "配置增强选项" : "Configure Enhancement Options", 
      description: isZhHans
        ? "选择分辨率、帧率和质量等级，启用降噪、防抖、色彩校正和锐化等 AI 增强功能。"
        : "Choose resolution, frame rate, and quality level, enable AI enhancement features like denoising, stabilization, color correction, and sharpening."
    },
    {
      icon: Icons.brain,
      title: isZhHans ? "AI 智能增强" : "AI Smart Enhancement",
      description: isZhHans
        ? "使用先进的 AI 视频增强技术，自动提升清晰度、稳定性和色彩表现。智能处理噪点、抖动和画质问题。"
        : "Uses advanced AI video enhancement technology to automatically improve clarity, stability, and color performance. Intelligently processes noise, shake, and quality issues."
    },
    {
      icon: Icons.download,
      title: isZhHans ? "下载增强视频" : "Download Enhanced Video",
      description: isZhHans
        ? "获得高质量增强后的视频文件，支持多种分辨率和格式输出。可直接用于发布、编辑或分享。"
        : "Get high-quality enhanced video file with multiple resolution and format options. Ready for publishing, editing, or sharing."
    }
  ];

  return (
    <section className="relative overflow-hidden py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:via-gray-800/30" />
      
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            {isZhHans ? "视频增强步骤" : "Video Enhancement Steps"}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            {isZhHans 
              ? "简单四步，轻松提升视频质量，获得专业级的视频效果"
              : "Four simple steps to easily enhance video quality and achieve professional video effects"
            }
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80"
              >
                {/* Step number */}
                <div className="absolute -right-4 -top-4 size-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-center text-lg font-bold text-white shadow-lg">
                  <span className="flex size-full items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-7" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mt-16">
          <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
              {isZhHans ? "先进的视频增强技术" : "Advanced Video Enhancement Technology"}
            </h3>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  <Icons.zap className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "超分辨率" : "Super Resolution"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "AI 智能提升分辨率，增强画面细节" : "AI-powered resolution enhancement with improved details"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  <Icons.shield className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "智能降噪" : "Intelligent Denoising"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "自动识别并去除视频噪点和瑕疵" : "Automatically identifies and removes video noise and artifacts"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                  <Icons.palette className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "色彩优化" : "Color Optimization"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "自动调整色彩平衡和对比度" : "Automatic color balance and contrast adjustment"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
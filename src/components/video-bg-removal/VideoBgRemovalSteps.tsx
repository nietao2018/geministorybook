"use client";

import React from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";

export default function VideoBgRemovalSteps() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';

  const steps = [
    {
      icon: Icons.upload,
      title: isZhHans ? "上传视频文件" : "Upload Video File",
      description: isZhHans 
        ? "选择您需要移除背景的视频文件，支持 MP4、MOV、AVI、WebM 等格式。适用于人物采访、产品展示、演讲视频等各种场景。"
        : "Select your video file that needs background removal. Supports MP4, MOV, AVI, WebM formats. Perfect for interviews, product demos, presentations and various scenarios."
    },
    {
      icon: Icons.settings,
      title: isZhHans ? "配置输出选项" : "Configure Output Options", 
      description: isZhHans
        ? "选择输出格式、质量等级和背景类型。可以设置透明背景、纯色背景或自定义图片背景，同时选择是否保留原始音频。"
        : "Choose output format, quality level and background type. Set transparent, solid color, or custom image background, and decide whether to preserve original audio."
    },
    {
      icon: Icons.brain,
      title: isZhHans ? "AI 智能处理" : "AI Smart Processing",
      description: isZhHans
        ? "使用先进的 AI 视频分割技术，精确识别人物或主体对象，智能分离前景和背景。保持边缘自然，确保视频质量。"
        : "Uses advanced AI video segmentation technology to precisely identify people or main subjects, intelligently separate foreground and background while maintaining natural edges and video quality."
    },
    {
      icon: Icons.download,
      title: isZhHans ? "下载处理视频" : "Download Processed Video",
      description: isZhHans
        ? "获得背景移除后的高质量视频文件，保持原始分辨率和帧率。可直接用于视频编辑、直播、会议等多种用途。"
        : "Get high-quality video file with background removed, maintaining original resolution and frame rate. Ready for video editing, streaming, meetings and various purposes."
    }
  ];

  return (
    <section className="relative overflow-hidden py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-gray-800/30" />
      
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            {isZhHans ? "视频背景移除步骤" : "Video Background Removal Steps"}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            {isZhHans 
              ? "简单四步，轻松移除视频背景，获得专业级的视频效果"
              : "Four simple steps to easily remove video background and achieve professional video effects"
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
                <div className="absolute -right-4 -top-4 size-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-center text-lg font-bold text-white shadow-lg">
                  <span className="flex size-full items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
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
              {isZhHans ? "先进的视频处理技术" : "Advanced Video Processing Technology"}
            </h3>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Icons.zap className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "精确分割" : "Precise Segmentation"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "AI 精确识别人物边缘，保持自然效果" : "AI precisely identifies object edges for natural results"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Icons.film className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "高质量输出" : "High Quality Output"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "保持原始分辨率和帧率，无质量损失" : "Maintains original resolution and frame rate without quality loss"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Icons.palette className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "多种背景选择" : "Multiple Background Options"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "透明、纯色或自定义图片背景" : "Transparent, solid color, or custom image backgrounds"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
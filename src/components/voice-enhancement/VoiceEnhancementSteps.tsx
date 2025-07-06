"use client";

import React from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";

export default function VoiceEnhancementSteps() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';

  const steps = [
    {
      icon: Icons.upload,
      title: isZhHans ? "上传音频文件" : "Upload Audio File",
      description: isZhHans 
        ? "选择您需要增强的音频文件，支持多种格式如 MP3、WAV、M4A 等。可以是会议录音、播客、电话录音或任何需要改善音质的音频内容。"
        : "Select your audio file that needs enhancement. Supports various formats like MP3, WAV, M4A. Can be meeting recordings, podcasts, phone calls, or any audio requiring quality improvement."
    },
    {
      icon: Icons.settings,
      title: isZhHans ? "选择增强选项" : "Choose Enhancement Options", 
      description: isZhHans
        ? "根据您的需求选择合适的增强选项：噪音消除可去除背景噪音，语音增强提升人声清晰度，音量标准化确保音量一致性。"
        : "Select appropriate enhancement options based on your needs: Noise reduction removes background noise, voice enhancement improves speech clarity, volume normalization ensures consistent audio levels."
    },
    {
      icon: Icons.zap,
      title: isZhHans ? "AI 智能处理" : "AI Smart Processing",
      description: isZhHans
        ? "我们的 AI 算法将自动分析您的音频，智能识别人声和噪音，应用专业级的增强技术，显著提升音频质量和清晰度。"
        : "Our AI algorithms automatically analyze your audio, intelligently identify speech and noise, and apply professional-grade enhancement techniques to significantly improve audio quality and clarity."
    },
    {
      icon: Icons.download,
      title: isZhHans ? "下载增强音频" : "Download Enhanced Audio",
      description: isZhHans
        ? "处理完成后，您可以立即预览和下载增强后的音频文件。音质将得到显著改善，适合各种专业用途。"
        : "Once processing is complete, you can immediately preview and download the enhanced audio file. Audio quality will be significantly improved, suitable for various professional uses."
    }
  ];

  return (
    <section className="relative overflow-hidden py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-gray-800/30" />
      
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            {isZhHans ? "语音增强步骤" : "Voice Enhancement Steps"}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            {isZhHans 
              ? "简单四步，让您的音频获得专业级的音质提升"
              : "Four simple steps to give your audio professional-grade quality enhancement"
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
              {isZhHans ? "专业级增强技术" : "Professional Enhancement Technology"}
            </h3>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Icons.shield className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "智能降噪" : "Smart Noise Reduction"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "AI 自动识别并消除各种背景噪音" : "AI automatically identifies and eliminates various background noises"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Icons.mic className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "语音优化" : "Voice Optimization"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "专门优化人声频率，提升清晰度" : "Specially optimizes speech frequencies for improved clarity"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Icons.volume2 className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "音量平衡" : "Volume Balance"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "智能调节音量，确保听觉体验一致" : "Intelligently adjusts volume for consistent listening experience"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
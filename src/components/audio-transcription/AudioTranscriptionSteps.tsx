"use client";

import React from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";

export default function AudioTranscriptionSteps() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';

  const steps = [
    {
      icon: Icons.upload,
      title: isZhHans ? "上传音频文件" : "Upload Audio File",
      description: isZhHans 
        ? "选择您需要转录的音频文件，支持多种格式如 MP3、WAV、M4A 等。可以是会议录音、播客、讲座、访谈或任何包含语音内容的音频。"
        : "Select your audio file that needs transcription. Supports various formats like MP3, WAV, M4A. Can be meeting recordings, podcasts, lectures, interviews, or any audio containing speech content."
    },
    {
      icon: Icons.settings,
      title: isZhHans ? "配置转录选项" : "Configure Transcription Options", 
      description: isZhHans
        ? "选择音频语言、是否包含时间戳、说话人分离等选项。我们支持多种语言识别，并可以自动检测音频中的语言类型。"
        : "Choose audio language, timestamps, speaker diarization options. We support multiple language recognition and can automatically detect the language type in audio."
    },
    {
      icon: Icons.brain,
      title: isZhHans ? "AI 智能转录" : "AI Smart Transcription",
      description: isZhHans
        ? "使用先进的语音识别技术，准确识别音频中的语音内容。支持多种语言，并能处理不同口音、语速和音质的音频文件。"
        : "Uses advanced speech recognition technology to accurately identify speech content in audio. Supports multiple languages and can handle audio files with different accents, speeds, and quality."
    },
    {
      icon: Icons.download,
      title: isZhHans ? "下载转录文本" : "Download Transcription Text",
      description: isZhHans
        ? "获得准确的文字转录结果，支持多种格式下载如 TXT、SRT、VTT 等。包含时间戳信息，方便后续编辑和使用。"
        : "Get accurate text transcription results with multiple download formats like TXT, SRT, VTT. Includes timestamp information for easy editing and future use."
    }
  ];

  return (
    <section className="relative overflow-hidden py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-gray-800/30" />
      
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            {isZhHans ? "音频转录步骤" : "Audio Transcription Steps"}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            {isZhHans 
              ? "简单四步，将您的音频内容快速转换为准确的文字"
              : "Four simple steps to quickly convert your audio content into accurate text"
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
              {isZhHans ? "强大的转录功能" : "Powerful Transcription Features"}
            </h3>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Icons.globe className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "多语言支持" : "Multi-Language Support"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "支持 50+ 种语言的准确识别" : "Accurate recognition of 50+ languages"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Icons.clock className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "时间戳精确" : "Precise Timestamps"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "毫秒级精度的时间戳标记" : "Millisecond-precision timestamp marking"}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Icons.users className="size-6" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "说话人分离" : "Speaker Diarization"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isZhHans ? "智能识别不同说话人" : "Intelligently identify different speakers"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
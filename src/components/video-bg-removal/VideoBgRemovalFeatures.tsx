"use client";

import React from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";

export default function VideoBgRemovalFeatures() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';

  const features = [
    {
      icon: Icons.users,
      title: isZhHans ? "人物采访视频" : "Interview Videos",
      description: isZhHans
        ? "移除采访背景，突出受访者，适用于新闻采访、企业访谈、人物专访等场景。"
        : "Remove interview backgrounds to highlight interviewees, perfect for news interviews, corporate interviews, and personal profiles.",
      tags: [
        isZhHans ? "新闻采访" : "News Interview",
        isZhHans ? "企业访谈" : "Corporate Interview",
        isZhHans ? "人物专访" : "Personal Interview"
      ]
    },
    {
      icon: Icons.package,
      title: isZhHans ? "产品展示视频" : "Product Demonstration",
      description: isZhHans
        ? "突出产品特色，移除杂乱背景，提升产品展示效果，适用于电商、广告、营销视频。"
        : "Highlight product features by removing cluttered backgrounds, perfect for e-commerce, advertising, and marketing videos.",
      tags: [
        isZhHans ? "电商产品" : "E-commerce",
        isZhHans ? "广告营销" : "Advertising",
        isZhHans ? "产品发布" : "Product Launch"
      ]
    },
    {
      icon: Icons.presentation,
      title: isZhHans ? "教育培训视频" : "Educational Content",
      description: isZhHans
        ? "创建专业的教育内容，移除背景干扰，适用于在线课程、培训视频、知识分享。"
        : "Create professional educational content by removing background distractions, ideal for online courses, training videos, and knowledge sharing.",
      tags: [
        isZhHans ? "在线课程" : "Online Course",
        isZhHans ? "培训视频" : "Training Video",
        isZhHans ? "知识分享" : "Knowledge Share"
      ]
    },
    {
      icon: Icons.video,
      title: isZhHans ? "直播录制视频" : "Live Stream Recording",
      description: isZhHans
        ? "优化直播录制效果，移除背景杂音，适用于游戏直播、教学直播、会议录制。"
        : "Optimize live stream recordings by removing background noise, perfect for gaming streams, educational broadcasts, and meeting recordings.",
      tags: [
        isZhHans ? "游戏直播" : "Gaming Stream",
        isZhHans ? "教学直播" : "Educational Stream",
        isZhHans ? "会议录制" : "Meeting Recording"
      ]
    }
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.blue.500/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.purple.500/0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            {isZhHans ? "视频背景移除应用场景" : "Video Background Removal Use Cases"}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            {isZhHans
              ? "适用于各种视频制作场景，提升视频专业度和观看体验"
              : "Suitable for various video production scenarios to enhance professionalism and viewing experience"
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
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
                        className="rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400"
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

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {isZhHans ? "开始使用视频背景移除" : "Start Using Video Background Removal"}
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {isZhHans
                ? "上传您的视频文件，体验AI驱动的专业级背景移除效果"
                : "Upload your video files and experience professional-grade AI-powered background removal"
              }
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Icons.check className="size-4 text-green-600" />
                <span>{isZhHans ? "支持多种视频格式" : "Multiple video formats supported"}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Icons.check className="size-4 text-green-600" />
                <span>{isZhHans ? "保持原始分辨率" : "Original resolution maintained"}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Icons.check className="size-4 text-green-600" />
                <span>{isZhHans ? "高速处理" : "Fast processing"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
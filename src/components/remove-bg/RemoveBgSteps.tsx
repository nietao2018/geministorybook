'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

const stepData = [
  {
    title: "Step 1 Upload Image",
    description: "Select an image to remove the background. JPG/PNG format supported, up to 2MB.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Step 2 Remove Background",
    description: "Click the button and AI will automatically remove the background for you.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Step 3 Get Result",
    description: "Preview and download the image with the background removed. You can process more images as needed.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

export default function RemoveBgSteps() {
  const [step, setStep] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 处理图片上传
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setStep(1);
    }
  };

  // 模拟背景移除
  const handleRemoveBg = async () => {
    setLoading(true);
    setTimeout(() => {
      // 这里应调用实际的API，返回处理后的图片URL
      setResultUrl(previewUrl || "");
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <section className="px-2.5 py-16 md:py-24" aria-label="Remove Background Steps">
      <h2 className="sr-only">How to Remove Image Background in 3 Steps</h2>
      <div className="mx-auto w-full max-w-6xl rounded-3xl border bg-background/90 p-0 shadow-2xl md:p-14">
        {/* Step Bar */}
        <ol className="relative flex items-center justify-between px-8 pb-10 pt-6" style={{ listStyle: 'none' }}>
          {/* 贯穿线条 */}
          {/* <div className="absolute inset-x-0 top-1/2 z-0 h-0.5 bg-gray-200" style={{ transform: 'translateY(-50%)' }} /> */}
          {stepData.map((stepItem, idx) => (
            <li key={stepItem.title} className="relative z-10 flex min-w-[180px] flex-1 flex-col items-center">
              {/* 圆点 */}
              {/* <div className="mb-2 size-4 rounded-full border-4 border-background bg-purple-400 shadow" /> */}
              {/* step标题 */}
              <span className="relative z-10 bg-background px-3 text-xl font-bold tracking-wide text-purple-700">
                {stepItem.title}
              </span>
            </li>
          ))}
        </ol>

        {/* Step Content Cards */}
        <div className="grid grid-cols-1 gap-10 px-8 pb-14 pt-4 md:grid-cols-3">
          {stepData.map((stepItem, idx) => (
            <article
              key={stepItem.title}
              className="flex h-full min-h-[180px] flex-col items-center rounded-2xl bg-white/90 p-10 text-center shadow-md dark:bg-zinc-900/80"
              aria-label={stepItem.title}
            >
              <img
                src={stepItem.image}
                alt={stepItem.title.replace(/Step \d+ /, '') + ' example photo'}
                className="mb-5 size-28 rounded-xl object-contain shadow"
                loading="lazy"
              />
              <p className="mx-auto max-w-sm text-base leading-relaxed text-muted-foreground">{stepItem.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 
"use client";

import React, { useState, useRef, useCallback } from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface VideoFile {
  file: File;
  previewUrl: string;
  duration?: number;
  dimensions?: { width: number; height: number };
}

export default function VideoEnhancementClient() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';
  const { toast } = useToast();
  
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [processingOptions, setProcessingOptions] = useState({
    resolution: 'original' as 'original' | '720p' | '1080p' | '4k',
    frameRate: 'original' as 'original' | '30fps' | '60fps',
    quality: 'high' as 'medium' | 'high' | 'ultra',
    denoising: true,
    stabilization: true,
    colorCorrection: true,
    sharpening: true
  });

  // 视频格式验证
  const validateVideoFile = (file: File): boolean => {
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'];
    const maxSize = 1024 * 1024 * 1024; // 1GB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: isZhHans ? "格式错误" : "Format Error",
        description: isZhHans 
          ? "请选择 MP4、MOV、AVI 或 WebM 格式的视频文件" 
          : "Please select MP4, MOV, AVI, or WebM video files",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: isZhHans ? "文件过大" : "File Too Large",
        description: isZhHans 
          ? "视频文件大小不能超过 1GB" 
          : "Video file size cannot exceed 1GB",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // 获取视频信息
  const getVideoInfo = (file: File): Promise<{ duration: number; dimensions: { width: number; height: number } }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => {
        resolve({
          duration: video.duration,
          dimensions: {
            width: video.videoWidth,
            height: video.videoHeight
          }
        });
      };
      video.onerror = () => reject(new Error('Cannot load video metadata'));
      video.src = URL.createObjectURL(file);
    });
  };

  // 处理文件选择
  const handleFileChange = useCallback(async (file: File) => {
    if (!validateVideoFile(file)) return;

    try {
      const { duration, dimensions } = await getVideoInfo(file);
      const previewUrl = URL.createObjectURL(file);
      
      setVideoFile({
        file,
        previewUrl,
        duration,
        dimensions
      });
      setResultUrl(null);
    } catch (error) {
      toast({
        title: isZhHans ? "文件读取失败" : "File Read Failed",
        description: isZhHans ? "无法读取视频文件" : "Cannot read video file",
        variant: "destructive",
      });
    }
  }, [isZhHans, toast]);

  // 拖拽处理
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  }, [handleFileChange]);

  // 处理视频增强
  const handleVideoEnhancement = async () => {
    if (!videoFile) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('video', videoFile.file);
      formData.append('options', JSON.stringify(processingOptions));

      // 模拟进度更新 (视频增强通常需要更长时间)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + Math.random() * 6;
        });
      }, 1200);

      const response = await fetch('/api/generate/video-enhancement', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Video enhancement failed');
      }

      const blob = await response.blob();
      const resultUrl = URL.createObjectURL(blob);
      setResultUrl(resultUrl);

      toast({
        title: isZhHans ? "视频增强完成" : "Video Enhancement Complete",
        description: isZhHans ? "视频增强已完成" : "Video enhancement completed successfully",
      });

    } catch (error) {
      console.error('Video enhancement error:', error);
      toast({
        title: isZhHans ? "处理失败" : "Processing Failed",
        description: isZhHans ? "视频增强失败，请重试" : "Video enhancement failed, please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // 下载结果
  const handleDownload = () => {
    if (!resultUrl || !videoFile) return;

    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `enhanced_${videoFile.file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 示例视频文件
  const exampleVideos = [
    {
      name: isZhHans ? "低清晰度视频" : "Low Resolution Video",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/low-res-video.mp4",
      description: isZhHans ? "需要分辨率提升的视频" : "Video needing resolution enhancement"
    },
    {
      name: isZhHans ? "抖动视频" : "Shaky Video",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/shaky-video.mp4", 
      description: isZhHans ? "手持拍摄的不稳定视频" : "Unstable handheld recording"
    },
    {
      name: isZhHans ? "噪点视频" : "Noisy Video",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/noisy-video.mp4",
      description: isZhHans ? "含有噪点的暗光视频" : "Low-light video with noise"
    }
  ];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 左侧：上传和设置 */}
          <div className="space-y-6">
            {/* 文件上传区域 */}
            <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {isZhHans ? "上传视频文件" : "Upload Video File"}
              </h3>
              
              <div
                className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                  dragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                    : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900">
                    <Icons.video className="size-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "拖拽视频文件到此处" : "Drag video file here"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isZhHans ? "或点击选择文件" : "or click to select file"}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {isZhHans ? "支持 MP4、MOV、AVI、WebM 格式，最大 1GB" : "Supports MP4, MOV, AVI, WebM formats, max 1GB"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 示例视频 */}
            <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {isZhHans ? "示例视频" : "Example Videos"}
              </h3>
              
              <div className="space-y-3">
                {exampleVideos.map((example, index) => (
                  <div
                    key={index}
                    className="cursor-pointer rounded-xl border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                    onClick={() => {
                      toast({
                        title: isZhHans ? "示例加载" : "Example Loading",
                        description: isZhHans ? "示例视频加载中..." : "Loading example video...",
                      });
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Icons.play className="size-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{example.name}</p>
                        <p className="text-sm text-gray-500">{example.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 处理选项 */}
            {videoFile && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "增强选项" : "Enhancement Options"}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "分辨率" : "Resolution"}
                    </label>
                    <select
                      value={processingOptions.resolution}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        resolution: e.target.value as 'original' | '720p' | '1080p' | '4k'
                      }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="original">{isZhHans ? "保持原始" : "Keep Original"}</option>
                      <option value="720p">720p HD</option>
                      <option value="1080p">1080p Full HD</option>
                      <option value="4k">4K Ultra HD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "帧率" : "Frame Rate"}
                    </label>
                    <select
                      value={processingOptions.frameRate}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        frameRate: e.target.value as 'original' | '30fps' | '60fps'
                      }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="original">{isZhHans ? "保持原始" : "Keep Original"}</option>
                      <option value="30fps">30 FPS</option>
                      <option value="60fps">60 FPS</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "质量等级" : "Quality Level"}
                    </label>
                    <select
                      value={processingOptions.quality}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        quality: e.target.value as 'medium' | 'high' | 'ultra'
                      }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="medium">{isZhHans ? "中等" : "Medium"}</option>
                      <option value="high">{isZhHans ? "高质量" : "High"}</option>
                      <option value="ultra">{isZhHans ? "超高质量" : "Ultra"}</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={processingOptions.denoising}
                        onChange={(e) => setProcessingOptions(prev => ({
                          ...prev,
                          denoising: e.target.checked
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-900 dark:text-white">
                        {isZhHans ? "降噪处理" : "Denoising"}
                      </span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={processingOptions.stabilization}
                        onChange={(e) => setProcessingOptions(prev => ({
                          ...prev,
                          stabilization: e.target.checked
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-900 dark:text-white">
                        {isZhHans ? "防抖处理" : "Stabilization"}
                      </span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={processingOptions.colorCorrection}
                        onChange={(e) => setProcessingOptions(prev => ({
                          ...prev,
                          colorCorrection: e.target.checked
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-900 dark:text-white">
                        {isZhHans ? "色彩校正" : "Color Correction"}
                      </span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={processingOptions.sharpening}
                        onChange={(e) => setProcessingOptions(prev => ({
                          ...prev,
                          sharpening: e.target.checked
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-900 dark:text-white">
                        {isZhHans ? "锐化处理" : "Sharpening"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：预览和结果 */}
          <div className="space-y-6">
            {/* 视频预览 */}
            {videoFile && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "原始视频" : "Original Video"}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                    <Icons.video className="size-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {videoFile.file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(videoFile.file.size)}
                        {videoFile.duration && ` • ${formatDuration(videoFile.duration)}`}
                        {videoFile.dimensions && ` • ${videoFile.dimensions.width}x${videoFile.dimensions.height}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl">
                    <video
                      ref={videoRef}
                      src={videoFile.previewUrl}
                      controls
                      className="h-auto max-h-64 w-full bg-gray-100 object-contain dark:bg-gray-800"
                    />
                  </div>
                  
                  <Button
                    onClick={handleVideoEnhancement}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {isProcessing ? (
                      <>
                        <Icons.spinner className="mr-2 size-4 animate-spin" />
                        {isZhHans ? "增强中..." : "Enhancing..."}
                      </>
                    ) : (
                      <>
                        <Icons.sparkles className="mr-2 size-4" />
                        {isZhHans ? "开始增强" : "Start Enhancement"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* 处理进度 */}
            {isProcessing && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "处理进度" : "Processing Progress"}
                </h3>
                
                <div className="space-y-4">
                  <Progress value={progress} className="w-full" />
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {Math.round(progress)}% {isZhHans ? "完成" : "complete"}
                  </p>
                  <p className="text-center text-xs text-gray-500">
                    {isZhHans ? "正在使用 AI 技术增强视频质量..." : "Using AI technology to enhance video quality..."}
                  </p>
                </div>
              </div>
            )}

            {/* 处理结果 */}
            {resultUrl && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "增强结果" : "Enhanced Video"}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                    <Icons.check className="size-8 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {isZhHans ? "视频增强完成" : "Video Enhancement Complete"}
                      </p>
                      <p className="text-sm text-green-600">
                        {isZhHans ? "视频质量已显著提升" : "Video quality significantly improved"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl">
                    <video
                      src={resultUrl}
                      controls
                      className="h-auto max-h-64 w-full bg-gray-100 object-contain dark:bg-gray-800"
                    />
                  </div>
                  
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Icons.download className="mr-2 size-4" />
                    {isZhHans ? "下载增强视频" : "Download Enhanced Video"}
                  </Button>
                </div>
              </div>
            )}

            {/* 空状态 */}
            {!videoFile && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-12 text-center backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <Icons.video className="mx-auto mb-4 size-16 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "选择视频文件开始" : "Select video file to start"}
                </h3>
                <p className="text-gray-500">
                  {isZhHans 
                    ? "上传您的视频文件，我们将使用 AI 技术提升视频质量"
                    : "Upload your video file and we'll enhance it with AI technology"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
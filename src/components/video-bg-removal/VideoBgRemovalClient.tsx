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

export default function VideoBgRemovalClient() {
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
    outputFormat: 'mp4' as 'mp4' | 'mov' | 'webm',
    quality: 'high' as 'medium' | 'high' | 'ultra',
    backgroundType: 'transparent' as 'transparent' | 'color' | 'image',
    backgroundColor: '#00ff00',
    preserveAudio: true
  });

  // 视频格式验证
  const validateVideoFile = (file: File): boolean => {
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'];
    const maxSize = 500 * 1024 * 1024; // 500MB

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
          ? "视频文件大小不能超过 500MB" 
          : "Video file size cannot exceed 500MB",
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

  // 处理视频背景移除
  const handleBackgroundRemoval = async () => {
    if (!videoFile) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('video', videoFile.file);
      formData.append('options', JSON.stringify(processingOptions));

      // 模拟进度更新 (视频处理通常需要更长时间)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + Math.random() * 8;
        });
      }, 1000);

      const response = await fetch('/api/generate/video-bg-removal', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Background removal failed');
      }

      const blob = await response.blob();
      const resultUrl = URL.createObjectURL(blob);
      setResultUrl(resultUrl);

      toast({
        title: isZhHans ? "背景移除完成" : "Background Removal Complete",
        description: isZhHans ? "视频背景移除已完成" : "Video background removal completed successfully",
      });

    } catch (error) {
      console.error('Background removal error:', error);
      toast({
        title: isZhHans ? "处理失败" : "Processing Failed",
        description: isZhHans ? "视频背景移除失败，请重试" : "Video background removal failed, please try again",
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
    link.download = `bg_removed_${videoFile.file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 示例视频文件
  const exampleVideos = [
    {
      name: isZhHans ? "人物采访示例" : "Person Interview",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/person-interview.mp4",
      description: isZhHans ? "单人采访视频，适合背景移除" : "Single person interview, suitable for background removal"
    },
    {
      name: isZhHans ? "产品展示示例" : "Product Demo",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/product-demo.mp4", 
      description: isZhHans ? "产品演示视频，清晰的主体" : "Product demonstration with clear subject"
    },
    {
      name: isZhHans ? "演讲视频示例" : "Presentation Video",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/presentation.mp4",
      description: isZhHans ? "演讲视频，静态背景" : "Presentation video with static background"
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
                      {isZhHans ? "支持 MP4、MOV、AVI、WebM 格式，最大 500MB" : "Supports MP4, MOV, AVI, WebM formats, max 500MB"}
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
                  {isZhHans ? "处理选项" : "Processing Options"}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "输出格式" : "Output Format"}
                    </label>
                    <select
                      value={processingOptions.outputFormat}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        outputFormat: e.target.value as 'mp4' | 'mov' | 'webm'
                      }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="mp4">MP4</option>
                      <option value="mov">MOV</option>
                      <option value="webm">WebM</option>
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
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "背景类型" : "Background Type"}
                    </label>
                    <select
                      value={processingOptions.backgroundType}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        backgroundType: e.target.value as 'transparent' | 'color' | 'image'
                      }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="transparent">{isZhHans ? "透明背景" : "Transparent"}</option>
                      <option value="color">{isZhHans ? "纯色背景" : "Solid Color"}</option>
                      <option value="image">{isZhHans ? "图片背景" : "Image Background"}</option>
                    </select>
                  </div>
                  
                  {processingOptions.backgroundType === 'color' && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {isZhHans ? "背景颜色" : "Background Color"}
                      </label>
                      <input
                        type="color"
                        value={processingOptions.backgroundColor}
                        onChange={(e) => setProcessingOptions(prev => ({
                          ...prev,
                          backgroundColor: e.target.value
                        }))}
                        className="h-10 w-full rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={processingOptions.preserveAudio}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        preserveAudio: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {isZhHans ? "保留音频" : "Preserve Audio"}
                    </span>
                  </label>
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
                    onClick={handleBackgroundRemoval}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {isProcessing ? (
                      <>
                        <Icons.spinner className="mr-2 size-4 animate-spin" />
                        {isZhHans ? "处理中..." : "Processing..."}
                      </>
                    ) : (
                      <>
                        <Icons.scissors className="mr-2 size-4" />
                        {isZhHans ? "移除背景" : "Remove Background"}
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
                    {isZhHans ? "正在使用 AI 技术移除视频背景..." : "Using AI technology to remove video background..."}
                  </p>
                </div>
              </div>
            )}

            {/* 处理结果 */}
            {resultUrl && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "处理结果" : "Processed Video"}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                    <Icons.check className="size-8 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {isZhHans ? "背景移除完成" : "Background Removal Complete"}
                      </p>
                      <p className="text-sm text-green-600">
                        {isZhHans ? "视频背景已成功移除" : "Video background successfully removed"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl">
                    <video
                      src={resultUrl}
                      controls
                      className="h-auto max-h-64 w-full bg-transparent object-contain"
                    />
                  </div>
                  
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Icons.download className="mr-2 size-4" />
                    {isZhHans ? "下载处理后的视频" : "Download Processed Video"}
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
                    ? "上传您的视频文件，我们将使用 AI 技术移除背景"
                    : "Upload your video file and we'll remove the background with AI technology"
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
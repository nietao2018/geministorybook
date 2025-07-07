"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { earthZoomOutConfig } from "@/config/earth-zoom-out";

export default function EarthZoomOutClient() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';
  const config = isZhHans ? earthZoomOutConfig.zh : earthZoomOutConfig.en;
  const { toast } = useToast();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [zoomFrames, setZoomFrames] = useState<string[]>([]);
  
  // Animation parameters
  const [settings, setSettings] = useState({
    zoomSpeed: 0.02,
    zoomLevels: 10,
    frameCount: 30,
    animationDuration: 3000,
    easeType: 'ease-out',
    centerX: 0.5,
    centerY: 0.5
  });

  // Animation state
  const [animationState, setAnimationState] = useState({
    currentFrame: 0,
    zoom: 1,
    time: 0
  });

  // Handle image upload
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: config.component.toasts.invalidFormat.title,
        description: config.component.toasts.invalidFormat.description,
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      toast({
        title: config.component.toasts.uploadSuccess.title,
        description: config.component.toasts.uploadSuccess.description,
      });
    };
    reader.readAsDataURL(file);
  }, [config.component.toasts.invalidFormat.title, config.component.toasts.invalidFormat.description, config.component.toasts.uploadSuccess.title, config.component.toasts.uploadSuccess.description, toast]);

  // Generate zoom frames from uploaded image
  const generateZoomFrames = useCallback(async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    setZoomFrames([]);
    
    try {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = uploadedImage;
      });
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      const frames: string[] = [];
      const { frameCount, zoomLevels, centerX, centerY } = settings;
      
      // Calculate zoom progression
      for (let i = 0; i < frameCount; i++) {
        const progress = i / (frameCount - 1);
        const easeProgress = getEaseValue(progress, settings.easeType);
        const zoomLevel = 1 + (zoomLevels - 1) * easeProgress;
        
        // Calculate crop dimensions
        const cropWidth = img.width / zoomLevel;
        const cropHeight = img.height / zoomLevel;
        const cropX = (img.width * centerX) - (cropWidth / 2);
        const cropY = (img.height * centerY) - (cropHeight / 2);
        
        // Set canvas size
        canvas.width = Math.min(800, img.width);
        canvas.height = Math.min(600, img.height);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw cropped and scaled image
        ctx.drawImage(
          img,
          Math.max(0, cropX), Math.max(0, cropY),
          Math.min(cropWidth, img.width), Math.min(cropHeight, img.height),
          0, 0,
          canvas.width, canvas.height
        );
        
        frames.push(canvas.toDataURL('image/jpeg', 0.9));
        setProcessingProgress((i + 1) / frameCount * 100);
        
        // Allow UI to update
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      setZoomFrames(frames);
      toast({
        title: config.component.toasts.framesGenerated.title,
        description: config.component.toasts.framesGenerated.description.replace('{count}', frames.length.toString()),
      });
    } catch (error) {
      toast({
        title: config.component.toasts.processingFailed.title,
        description: config.component.toasts.processingFailed.description,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedImage, settings, isZhHans, toast]);

  // Easing functions
  const getEaseValue = (t: number, easeType: string): number => {
    switch (easeType) {
      case 'ease-in':
        return t * t;
      case 'ease-out':
        return 1 - (1 - t) * (1 - t);
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      default:
        return t; // linear
    }
  };

  // Download frames as GIF or video
  const downloadAnimation = useCallback(async () => {
    if (zoomFrames.length === 0) return;
    
    // For now, just download the first and last frame
    const link = document.createElement('a');
    link.download = 'zoom-animation-frames.zip';
    
    toast({
      title: isZhHans ? "下载功能开发中" : "Download Feature Coming Soon",
      description: isZhHans ? "暂时支持预览，下载功能即将上线" : "Preview available, download feature coming soon",
    });
  }, [zoomFrames, isZhHans, toast]);

  // Animation loop for playing generated frames
  const animate = useCallback(() => {
    if (!isPlaying || zoomFrames.length === 0) return;

    const frameInterval = settings.animationDuration / zoomFrames.length;
    
    setAnimationState(prev => {
      const nextFrame = (prev.currentFrame + 1) % zoomFrames.length;
      const newTime = prev.time + frameInterval;
      
      if (nextFrame === 0 && prev.currentFrame !== 0) {
        // Animation completed one cycle
        setIsPlaying(false);
        toast({
          title: isZhHans ? "动画完成" : "Animation Complete",
          description: isZhHans ? "图片缩放动画已完成" : "Image zoom animation completed",
        });
        return { currentFrame: 0, zoom: 1, time: 0 };
      }
      
      return {
        currentFrame: nextFrame,
        zoom: 1 + (settings.zoomLevels - 1) * (nextFrame / zoomFrames.length),
        time: newTime
      };
    });
    
    const timeoutId = setTimeout(() => {
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }, frameInterval);
    
    return () => clearTimeout(timeoutId);
  }, [isPlaying, zoomFrames, settings, isZhHans, toast]);

  // Render current frame to canvas
  const renderCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    if (zoomFrames.length > 0) {
      const currentFrameImage = new Image();
      currentFrameImage.onload = () => {
        ctx.drawImage(currentFrameImage, 0, 0, width, height);
      };
      currentFrameImage.src = zoomFrames[animationState.currentFrame] || zoomFrames[0];
    } else if (uploadedImage) {
      // Show original image if no frames generated yet
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(width / img.width, height / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;
        
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      };
      img.src = uploadedImage;
    } else {
      // Show placeholder
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.font = '16px sans-serif';
      ctx.fillText(
        isZhHans ? '上传图片开始制作缩放动画' : 'Upload an image to create zoom animation',
        width / 2,
        height / 2
      );
    }
  }, [zoomFrames, animationState.currentFrame, uploadedImage, isZhHans]);

  // Start animation
  const startAnimation = () => {
    if (zoomFrames.length === 0) {
      toast({
        title: isZhHans ? "请先生成动画帧" : "Please Generate Frames First",
        description: isZhHans ? "需要先上传图片并生成动画帧" : "Upload an image and generate frames first",
        variant: "destructive",
      });
      return;
    }
    
    setIsPlaying(true);
    setIsPaused(false);
    setAnimationState({ currentFrame: 0, zoom: 1, time: 0 });
    
    toast({
      title: isZhHans ? "动画开始" : "Animation Started",
      description: isZhHans ? "图片缩放动画已开始" : "Image zoom animation started",
    });
  };

  // Pause/Resume animation
  const togglePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  // Reset animation
  const resetAnimation = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setAnimationState({ currentFrame: 0, zoom: 1, time: 0 });
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Animation loop effect
  useEffect(() => {
    if (isPlaying && !isPaused && zoomFrames.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isPaused, animate, zoomFrames]);

  // Initial render and update on changes
  useEffect(() => {
    renderCurrentFrame();
  }, [renderCurrentFrame, animationState.currentFrame, uploadedImage, zoomFrames]);

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>{isZhHans ? "图片缩放预览" : "Image Zoom Preview"}</CardTitle>
                <CardDescription>
                  {isZhHans ? "预览您的图片缩放动画效果" : "Preview your image zoom animation effect"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="h-96 w-full bg-black lg:h-[500px]"
                    style={{ display: 'block' }}
                  />
                  
                  {/* Animation Info Overlay */}
                  {(zoomFrames.length > 0 || uploadedImage) && (
                    <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 p-3 text-white backdrop-blur-sm">
                      <div className="text-sm">
                        <div>{isZhHans ? "缩放级别" : "Zoom Level"}: {animationState.zoom.toFixed(2)}x</div>
                        <div>{isZhHans ? "当前帧" : "Current Frame"}: {animationState.currentFrame + 1}/{zoomFrames.length || 1}</div>
                        <div>{isZhHans ? "动画时间" : "Time"}: {animationState.time.toFixed(1)}s</div>
                      </div>
                    </div>
                  )}

                  {/* Play Controls Overlay */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <Button
                      onClick={startAnimation}
                      disabled={isPlaying && !isPaused}
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Icons.play className="size-4" />
                    </Button>
                    
                    <Button
                      onClick={togglePause}
                      disabled={!isPlaying && !isPaused}
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      {isPaused ? <Icons.play className="size-4" /> : <Icons.pause className="size-4" />}
                    </Button>
                    
                    <Button
                      onClick={resetAnimation}
                      size="sm"
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Icons.rotateCounterClockwise className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>{isZhHans ? "上传地表图片" : "Upload Earth Surface Image"}</CardTitle>
                <CardDescription>
                  {isZhHans ? "上传一张图片作为地球表面，创建从近距离到太空的缩放动画" : "Upload an image as Earth surface to create zoom-out animation from close-up to space"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                    variant="outline"
                  >
                    <Icons.upload className="mr-2 size-4" />
                    {isZhHans ? "选择图片" : "Choose Image"}
                  </Button>
                  
                  {uploadedImage && (
                    <div className="text-sm text-green-600">
                      {isZhHans ? "地表图片已上传成功" : "Earth surface image uploaded successfully"}
                    </div>
                  )}
                  
                  <Button
                    onClick={generateZoomFrames}
                    disabled={!uploadedImage || isProcessing}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {isProcessing ? (
                      <>
                        <Icons.spinner className="mr-2 size-4 animate-spin" />
                        {isZhHans ? "生成中..." : "Generating..."}
                      </>
                    ) : (
                      <>
                        <Icons.zap className="mr-2 size-4" />
                        {isZhHans ? "生成地球缩放帧" : "Generate Earth Zoom Frames"}
                      </>
                    )}
                  </Button>
                  
                  {isProcessing && (
                    <Progress value={processingProgress} className="w-full" />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Animation Controls */}
            <Card>
              <CardHeader>
                <CardTitle>{isZhHans ? "动画控制" : "Animation Controls"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={startAnimation}
                    disabled={isPlaying && !isPaused}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    {isPlaying && !isPaused ? (
                      <>
                        <Icons.spinner className="mr-2 size-4 animate-spin" />
                        {isZhHans ? "播放中..." : "Playing..."}
                      </>
                    ) : (
                      <>
                        <Icons.play className="mr-2 size-4" />
                        {isZhHans ? "开始动画" : "Start Animation"}
                      </>
                    )}
                  </Button>

                  <div className="flex space-x-2">
                    <Button
                      onClick={togglePause}
                      disabled={!isPlaying && !isPaused}
                      className="flex-1"
                      variant="outline"
                    >
                      {isPaused ? <Icons.play className="size-4" /> : <Icons.pause className="size-4" />}
                    </Button>
                    
                    <Button
                      onClick={resetAnimation}
                      className="flex-1"
                      variant="outline"
                    >
                      <Icons.rotateCounterClockwise className="size-4" />
                    </Button>
                  </div>
                  
                  <Button
                    onClick={downloadAnimation}
                    disabled={zoomFrames.length === 0}
                    className="w-full"
                    variant="outline"
                  >
                    <Icons.download className="mr-2 size-4" />
                    {isZhHans ? "下载动画" : "Download Animation"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Animation Settings */}
            <Card>
              <CardHeader>
                <CardTitle>{isZhHans ? "动画设置" : "Animation Settings"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {isZhHans ? "缩放级别" : "Zoom Levels"}: {settings.zoomLevels}x
                    </label>
                    <Slider
                      value={[settings.zoomLevels]}
                      onValueChange={([value]) => setSettings(prev => ({ ...prev, zoomLevels: value }))}
                      min={2}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {isZhHans ? "帧数" : "Frame Count"}: {settings.frameCount}
                    </label>
                    <Slider
                      value={[settings.frameCount]}
                      onValueChange={([value]) => setSettings(prev => ({ ...prev, frameCount: value }))}
                      min={10}
                      max={60}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {isZhHans ? "动画时长" : "Animation Duration"}: {settings.animationDuration}ms
                    </label>
                    <Slider
                      value={[settings.animationDuration]}
                      onValueChange={([value]) => setSettings(prev => ({ ...prev, animationDuration: value }))}
                      min={1000}
                      max={10000}
                      step={500}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {isZhHans ? "缩放中心 X" : "Zoom Center X"}: {settings.centerX.toFixed(2)}
                    </label>
                    <Slider
                      value={[settings.centerX]}
                      onValueChange={([value]) => setSettings(prev => ({ ...prev, centerX: value }))}
                      min={0}
                      max={1}
                      step={0.01}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {isZhHans ? "缩放中心 Y" : "Zoom Center Y"}: {settings.centerY.toFixed(2)}
                    </label>
                    <Slider
                      value={[settings.centerY]}
                      onValueChange={([value]) => setSettings(prev => ({ ...prev, centerY: value }))}
                      min={0}
                      max={1}
                      step={0.01}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Easing Type */}
            <Card>
              <CardHeader>
                <CardTitle>{isZhHans ? "动画缓动" : "Animation Easing"}</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={settings.easeType}
                  onChange={(e) => setSettings(prev => ({ ...prev, easeType: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="linear">{isZhHans ? "线性" : "Linear"}</option>
                  <option value="ease-in">{isZhHans ? "缓入" : "Ease In"}</option>
                  <option value="ease-out">{isZhHans ? "缓出" : "Ease Out"}</option>
                  <option value="ease-in-out">{isZhHans ? "缓入缓出" : "Ease In-Out"}</option>
                </select>
              </CardContent>
            </Card>

            {/* Animation Status */}
            <Card>
              <CardHeader>
                <CardTitle>{isZhHans ? "动画状态" : "Animation Status"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{isZhHans ? "状态" : "Status"}:</span>
                    <span className={`font-medium ${
                      isPlaying ? 'text-green-600' : isPaused ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {isPlaying ? (isZhHans ? '播放中' : 'Playing') : 
                       isPaused ? (isZhHans ? '暂停' : 'Paused') : 
                       (isZhHans ? '停止' : 'Stopped')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isZhHans ? "帧数" : "Frames"}:</span>
                    <span className="font-medium text-blue-600">
                      {zoomFrames.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isZhHans ? "进度" : "Progress"}:</span>
                    <span className="font-medium text-green-600">
                      {zoomFrames.length > 0 ? ((animationState.currentFrame / zoomFrames.length) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isZhHans ? "图片" : "Image"}:</span>
                    <span className={`font-medium ${
                      uploadedImage ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {uploadedImage ? (isZhHans ? '已上传' : 'Uploaded') : (isZhHans ? '未上传' : 'Not uploaded')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
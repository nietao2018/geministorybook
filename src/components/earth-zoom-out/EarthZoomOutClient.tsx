"use client";

import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import { useParams } from 'next/navigation';
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { earthZoomOutConfig } from "@/config/earth-zoom-out";
import { toast as sonnerToast } from "sonner";

export default function EarthZoomOutClient() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';
  const config = isZhHans ? earthZoomOutConfig.zh : earthZoomOutConfig.en;
  const { toast } = useToast();
  const { setShowSignInModal } = useContext(ModalContext);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  
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


  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: config.component.toasts.invalidFormat.title,
        description: config.component.toasts.invalidFormat.description,
        variant: "destructive",
      });
      return;
    }

    setUploadedImage(URL.createObjectURL(file));
    setResultVideoUrl(null);
    setError(null);
    toast({
      title: config.component.toasts.uploadSuccess.title,
      description: config.component.toasts.uploadSuccess.description,
    });
  }, [config.component.toasts.invalidFormat.title, config.component.toasts.invalidFormat.description, config.component.toasts.uploadSuccess.title, config.component.toasts.uploadSuccess.description, toast]);

  // Handle image upload
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  // Function to poll for generation results
  const pollPredictionResult = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/prediction/${id}/get`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.status === 401) {
        setShowSignInModal(true);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Failed to get prediction: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'completed' && data.videoUrl) {
        // Generation successful, set result video
        setResultVideoUrl(data.videoUrl);
        setIsProcessing(false);
        toast({
          title: config.component.toasts.framesGenerated.title,
          description: config.component.toasts.framesGenerated.description,
        });
      } else if (data.status === 'failed') {
        // Generation failed
        setError('Video processing failed: ' + (data.error || 'Unknown error'));
        setIsProcessing(false);
        toast({
          title: config.component.toasts.processingFailed.title,
          description: config.component.toasts.processingFailed.description,
          variant: "destructive",
        });
      } else if (['processing', 'starting', 'pending'].includes(data.status)) {
        // Continue polling
        setTimeout(() => pollPredictionResult(id), 2000);
      }
    } catch (err) {
      console.error('Error polling for result:', err);
      setError('Error checking processing status');
      setIsProcessing(false);
      toast({
        title: config.component.toasts.processingFailed.title,
        description: config.component.toasts.processingFailed.description,
        variant: "destructive",
      });
    }
  }, [setShowSignInModal, config.component.toasts.framesGenerated.title, config.component.toasts.framesGenerated.description, config.component.toasts.processingFailed.title, config.component.toasts.processingFailed.description, toast]);

  // Generate zoom video using API
  const generateZoomVideo = useCallback(async () => {
    if (!uploadedImage) return;

    try {
      setIsProcessing(true);
      setError(null);
      setResultVideoUrl(null);

      // Convert URL to base64
      let imageBase64 = uploadedImage;
      if (uploadedImage.startsWith('blob:')) {
        // If it's a blob URL, convert to base64
        const response = await fetch(uploadedImage);
        const blob = await response.blob();
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result as string);
            } else {
              resolve('');
            }
          };
          reader.readAsDataURL(blob);
        });
      }
      
      // Prepare image data, remove base64 prefix
      const imageData = imageBase64.startsWith('data:') ? imageBase64.split(',')[1] : imageBase64;

      // Call API to generate earth zoom out video
      const response = await fetch('/api/replicate/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          input: {
            image: imageData,
            input_image: `data:image/jpeg;base64,${imageData}`,
            zoom_speed: settings.zoomSpeed,
            zoom_levels: settings.zoomLevels,
            frame_count: settings.frameCount,
            animation_duration: settings.animationDuration,
            ease_type: settings.easeType,
            center_x: settings.centerX,
            center_y: settings.centerY
          },
          useCredit: 20, // Earth zoom out costs 10 credits
          model: 'earthZoomOut',
          type: 'model'
        }),
      });

      if (response.status === 401) {
        setShowSignInModal(true);
        return;
      }
      
      if (response.status === 201) {
        setIsProcessing(false);
        sonnerToast.error(isZhHans ? "积分不足，请购买更多积分。" : "Insufficient credits, please purchase more.");
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 60000))

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.id) {
        setPredictionId(data.id);
        await pollPredictionResult(data.id);
      }
    } catch (error) {
      console.error('Error generating zoom video:', error);
      setError('Failed to generate zoom video');
      setIsProcessing(false);
      toast({
        title: config.component.toasts.processingFailed.title,
        description: config.component.toasts.processingFailed.description,
        variant: "destructive",
      });
    }
  }, [uploadedImage, settings, setShowSignInModal, pollPredictionResult, isZhHans, config.component.toasts.processingFailed.title, config.component.toasts.processingFailed.description, toast]);


  // Render current frame to canvas
  const renderCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    if (uploadedImage) {
      // Show original image
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
        isZhHans ? '上传图片开始制作地球缩放视频' : 'Upload an image to create earth zoom video',
        width / 2,
        height / 2
      );
    }
  }, [uploadedImage, isZhHans]);


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

  // Initial render and update on changes
  useEffect(() => {
    renderCurrentFrame();
  }, [renderCurrentFrame, uploadedImage]);

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>{isZhHans ? "上传地表图片" : "Upload Earth Surface Image"}</CardTitle>
                <CardDescription>
                  {isZhHans ? "上传一张图片作为地球表面，创建从近距离到太空的缩放视频" : "Upload an image as Earth surface to create zoom-out video from close-up to space"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Drag and Drop Area */}
                  <div 
                    className={`relative flex h-40 items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200 ${
                      isDragOver 
                        ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/20' 
                        : 'border-gray-300/60 bg-gray-50/50 hover:border-blue-400/60 hover:bg-blue-50/30 dark:border-gray-500/60 dark:bg-gray-800/50 dark:hover:border-blue-400/60 dark:hover:bg-blue-900/20'
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                  >
                    {uploadedImage ? (
                      <div className="relative size-full">
                        <img 
                          src={uploadedImage} 
                          alt="Earth surface" 
                          className="size-full rounded-lg object-cover" 
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute right-2 top-2 size-6 p-0"
                          onClick={() => {
                            setUploadedImage(null);
                            setResultVideoUrl(null);
                            setError(null);
                          }}
                        >
                          <Icons.close className="size-3" />
                        </Button>
                      </div>
                    ) : (
                      <label 
                        className="group flex size-full cursor-pointer flex-col items-center justify-center"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 transition-colors group-hover:scale-105 dark:from-blue-900/50 dark:to-purple-900/50">
                          <Icons.upload className="size-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="mb-1 font-medium text-gray-900 dark:text-white">
                          {isZhHans ? "拖拽图片到此处" : "Drop image here"}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {isZhHans ? "或点击选择文件" : "or click to browse"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  
                  <Button
                    onClick={generateZoomVideo}
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
                        {isZhHans ? "生成地球缩放视频 (20积分)" : "Generate Earth Zoom Video (20 credits)"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>



            {/* Generation Status */}
            <Card>
              <CardHeader>
                <CardTitle>{isZhHans ? "生成状态" : "Generation Status"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>{isZhHans ? "状态" : "Status"}:</span>
                    <span className={`font-medium ${
                      isProcessing ? 'text-yellow-600' : 
                      resultVideoUrl ? 'text-green-600' : 
                      error ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {isProcessing ? (isZhHans ? '生成中' : 'Processing') : 
                       resultVideoUrl ? (isZhHans ? '已完成' : 'Completed') : 
                       error ? (isZhHans ? '失败' : 'Failed') :
                       (isZhHans ? '就绪' : 'Ready')}
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
                  
                  <div className="flex justify-between">
                    <span>{isZhHans ? "视频" : "Video"}:</span>
                    <span className={`font-medium ${
                      resultVideoUrl ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {resultVideoUrl ? (isZhHans ? '已生成' : 'Generated') : (isZhHans ? '未生成' : 'Not generated')}
                    </span>
                  </div>
                  
                  {predictionId && (
                    <div className="flex justify-between">
                      <span>{isZhHans ? "任务ID" : "Task ID"}:</span>
                      <span className="font-mono text-xs text-gray-500">
                        {predictionId.slice(0, 8)}...
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>{isZhHans ? "消耗积分" : "Credits Cost"}:</span>
                    <span className="font-medium text-blue-600">
                      20 {isZhHans ? "积分" : "credits"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Preview Area */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>{isZhHans ? "地球缩放视频预览" : "Earth Zoom Video Preview"}</CardTitle>
                <CardDescription>
                  {resultVideoUrl 
                    ? (isZhHans ? "您的地球缩放视频已生成完成" : "Your earth zoom video has been generated")
                    : (isZhHans ? "上传图片并生成地球缩放视频" : "Upload an image to generate earth zoom video")
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  {/* Video Player or Canvas */}
                  {resultVideoUrl ? (
                    <div className="relative h-96 w-full lg:h-[500px]">
                      <video
                        controls
                        className="size-full object-contain"
                        src={resultVideoUrl}
                        poster={uploadedImage || undefined}
                      >
                        {isZhHans ? "您的浏览器不支持视频播放" : "Your browser does not support video playback"}
                      </video>
                      
                      {/* Download Button Overlay */}
                      <Button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = resultVideoUrl;
                          link.download = 'earth-zoom-out-video.mp4';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        size="sm"
                        className="absolute right-4 top-4 bg-blue-500 hover:bg-blue-600"
                      >
                        <Icons.download className="mr-2 size-4" />
                        {isZhHans ? "下载视频" : "Download Video"}
                      </Button>
                    </div>
                  ) : (
                    <canvas
                      ref={canvasRef}
                      className="h-96 w-full bg-black lg:h-[500px]"
                      style={{ display: 'block' }}
                    />
                  )}
                  
                  {/* Processing Overlay */}
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <div className="space-y-4 text-center text-white">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                          <Icons.spinner className="size-8 animate-spin" />
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium">{isZhHans ? "正在生成地球缩放视频..." : "Generating earth zoom video..."}</p>
                          <p className="text-sm text-gray-300">{isZhHans ? "请稍候，这可能需要几分钟" : "Please wait, this may take a few minutes"}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Overlay */}
                  {error && !isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 backdrop-blur-sm">
                      <div className="space-y-4 text-center text-white">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-500">
                          <Icons.close className="size-8" />
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium">{isZhHans ? "生成失败" : "Generation Failed"}</p>
                          <p className="text-sm">{error}</p>
                          <Button
                            onClick={() => setError(null)}
                            size="sm"
                            variant="outline"
                            className="mt-2"
                          >
                            {isZhHans ? "重试" : "Retry"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
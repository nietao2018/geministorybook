"use client";

import React, { useState, useRef, useCallback } from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface AudioFile {
  file: File;
  previewUrl: string;
  duration?: number;
}

export default function VoiceEnhancementClient() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';
  const { toast } = useToast();
  
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [processingOptions, setProcessingOptions] = useState({
    noiseReduction: true,
    voiceEnhancement: true,
    volumeNormalization: true,
    qualityLevel: 'high' as 'medium' | 'high' | 'ultra'
  });

  // 音频格式验证
  const validateAudioFile = (file: File): boolean => {
    const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/ogg', 'audio/mpeg'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: isZhHans ? "格式错误" : "Format Error",
        description: isZhHans 
          ? "请选择 MP3、WAV、M4A 或 OGG 格式的音频文件" 
          : "Please select MP3, WAV, M4A, or OGG audio files",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: isZhHans ? "文件过大" : "File Too Large",
        description: isZhHans 
          ? "音频文件大小不能超过 50MB" 
          : "Audio file size cannot exceed 50MB",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // 获取音频时长
  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.onloadedmetadata = () => {
        resolve(audio.duration);
      };
      audio.src = URL.createObjectURL(file);
    });
  };

  // 处理文件选择
  const handleFileChange = async (file: File) => {
    if (!validateAudioFile(file)) return;

    try {
      const duration = await getAudioDuration(file);
      const previewUrl = URL.createObjectURL(file);
      
      setAudioFile({
        file,
        previewUrl,
        duration
      });
      setResultUrl(null);
    } catch (error) {
      toast({
        title: isZhHans ? "文件读取失败" : "File Read Failed",
        description: isZhHans ? "无法读取音频文件" : "Cannot read audio file",
        variant: "destructive",
      });
    }
  };

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

  // 处理音频增强
  const handleEnhancement = async () => {
    if (!audioFile) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('audio', audioFile.file);
      formData.append('options', JSON.stringify(processingOptions));

      // 模拟进度更新
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      const response = await fetch('/api/generate/voice-enhancement', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Enhancement failed');
      }

      const blob = await response.blob();
      const resultUrl = URL.createObjectURL(blob);
      setResultUrl(resultUrl);

      toast({
        title: isZhHans ? "增强完成" : "Enhancement Complete",
        description: isZhHans ? "音频增强已完成" : "Audio enhancement completed successfully",
      });

    } catch (error) {
      console.error('Enhancement error:', error);
      toast({
        title: isZhHans ? "处理失败" : "Processing Failed",
        description: isZhHans ? "音频增强失败，请重试" : "Audio enhancement failed, please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // 下载结果
  const handleDownload = () => {
    if (!resultUrl || !audioFile) return;

    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `enhanced_${audioFile.file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 示例音频文件
  const exampleAudios = [
    {
      name: isZhHans ? "会议录音示例" : "Meeting Recording",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/meeting-audio.mp3",
      description: isZhHans ? "包含背景噪音的会议录音" : "Meeting recording with background noise"
    },
    {
      name: isZhHans ? "电话通话示例" : "Phone Call",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/phone-call.mp3", 
      description: isZhHans ? "音质较差的电话录音" : "Poor quality phone recording"
    },
    {
      name: isZhHans ? "播客录音示例" : "Podcast Recording",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/podcast-audio.mp3",
      description: isZhHans ? "需要音质优化的播客" : "Podcast needing quality improvement"
    }
  ];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                {isZhHans ? "上传音频文件" : "Upload Audio File"}
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
                  accept="audio/*"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900">
                    <Icons.mic className="size-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "拖拽音频文件到此处" : "Drag audio file here"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isZhHans ? "或点击选择文件" : "or click to select file"}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {isZhHans ? "支持 MP3、WAV、M4A、OGG 格式，最大 50MB" : "Supports MP3, WAV, M4A, OGG formats, max 50MB"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 示例音频 */}
            <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {isZhHans ? "示例音频" : "Example Audio"}
              </h3>
              
              <div className="space-y-3">
                {exampleAudios.map((example, index) => (
                  <div
                    key={index}
                    className="cursor-pointer rounded-xl border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                    onClick={() => {
                      // 这里可以实现从URL加载示例音频的逻辑
                      toast({
                        title: isZhHans ? "示例加载" : "Example Loading",
                        description: isZhHans ? "示例音频加载中..." : "Loading example audio...",
                      });
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Icons.headphones className="size-5 text-blue-600" />
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
            {audioFile && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "增强选项" : "Enhancement Options"}
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={processingOptions.noiseReduction}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        noiseReduction: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {isZhHans ? "噪音消除" : "Noise Reduction"}
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={processingOptions.voiceEnhancement}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        voiceEnhancement: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {isZhHans ? "语音增强" : "Voice Enhancement"}
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={processingOptions.volumeNormalization}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        volumeNormalization: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {isZhHans ? "音量标准化" : "Volume Normalization"}
                    </span>
                  </label>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "质量等级" : "Quality Level"}
                    </label>
                    <select
                      value={processingOptions.qualityLevel}
                      onChange={(e) => setProcessingOptions(prev => ({
                        ...prev,
                        qualityLevel: e.target.value as 'medium' | 'high' | 'ultra'
                      }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="medium">{isZhHans ? "中等" : "Medium"}</option>
                      <option value="high">{isZhHans ? "高质量" : "High"}</option>
                      <option value="ultra">{isZhHans ? "超高质量" : "Ultra"}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：预览和结果 */}
          <div className="space-y-6">
            {/* 原始音频预览 */}
            {audioFile && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "原始音频" : "Original Audio"}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                    <Icons.music className="size-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {audioFile.file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(audioFile.file.size / (1024 * 1024)).toFixed(1)} MB
                        {audioFile.duration && ` • ${formatDuration(audioFile.duration)}`}
                      </p>
                    </div>
                  </div>
                  
                  <audio
                    controls
                    src={audioFile.previewUrl}
                    className="w-full"
                  />
                  
                  <Button
                    onClick={handleEnhancement}
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
                        <Icons.zap className="mr-2 size-4" />
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
                </div>
              </div>
            )}

            {/* 增强结果 */}
            {resultUrl && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "增强结果" : "Enhanced Audio"}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                    <Icons.check className="size-8 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {isZhHans ? "音频增强完成" : "Audio Enhancement Complete"}
                      </p>
                      <p className="text-sm text-green-600">
                        {isZhHans ? "音质已显著提升" : "Audio quality significantly improved"}
                      </p>
                    </div>
                  </div>
                  
                  <audio
                    controls
                    src={resultUrl}
                    className="w-full"
                  />
                  
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Icons.download className="mr-2 size-4" />
                    {isZhHans ? "下载增强音频" : "Download Enhanced Audio"}
                  </Button>
                </div>
              </div>
            )}

            {/* 空状态 */}
            {!audioFile && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-12 text-center backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <Icons.headphones className="mx-auto mb-4 size-16 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "选择音频文件开始" : "Select audio file to start"}
                </h3>
                <p className="text-gray-500">
                  {isZhHans 
                    ? "上传您的音频文件，我们将使用 AI 技术提升音质"
                    : "Upload your audio file and we'll enhance it with AI technology"
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
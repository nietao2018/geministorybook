"use client";

import React, { useState, useRef, useCallback } from "react";
import { useParams } from 'next/navigation';
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AudioFile {
  file: File;
  previewUrl: string;
  duration?: number;
}

interface TranscriptionResult {
  text: string;
  segments?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  language?: string;
  confidence?: number;
}

export default function AudioTranscriptionClient() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';
  const { toast } = useToast();
  
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [transcriptionOptions, setTranscriptionOptions] = useState({
    language: 'auto', // auto, en, zh, es, fr, de, ja, ko
    includeTimestamps: true,
    speakerDiarization: false,
    outputFormat: 'text' as 'text' | 'srt' | 'vtt' | 'json'
  });

  // 音频格式验证
  const validateAudioFile = (file: File): boolean => {
    const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/ogg', 'audio/mpeg', 'audio/flac'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: isZhHans ? "格式错误" : "Format Error",
        description: isZhHans 
          ? "请选择 MP3、WAV、M4A、OGG 或 FLAC 格式的音频文件" 
          : "Please select MP3, WAV, M4A, OGG, or FLAC audio files",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: isZhHans ? "文件过大" : "File Too Large",
        description: isZhHans 
          ? "音频文件大小不能超过 100MB" 
          : "Audio file size cannot exceed 100MB",
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
      setTranscriptionResult(null);
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

  // 处理音频转录
  const handleTranscription = async () => {
    if (!audioFile) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('audio', audioFile.file);
      formData.append('options', JSON.stringify(transcriptionOptions));

      // 模拟进度更新
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 800);

      const response = await fetch('/api/generate/audio-transcription', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Transcription failed');
      }

      const result = await response.json();
      setTranscriptionResult(result);

      toast({
        title: isZhHans ? "转录完成" : "Transcription Complete",
        description: isZhHans ? "音频转录已完成" : "Audio transcription completed successfully",
      });

    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: isZhHans ? "转录失败" : "Transcription Failed",
        description: isZhHans ? "音频转录失败，请重试" : "Audio transcription failed, please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // 下载转录结果
  const handleDownload = (format: string) => {
    if (!transcriptionResult || !audioFile) return;

    let content = '';
    let filename = '';
    let mimeType = 'text/plain';

    switch (format) {
      case 'txt':
        content = transcriptionResult.text;
        filename = `transcript_${audioFile.file.name.replace(/\.[^/.]+$/, "")}.txt`;
        break;
      case 'srt':
        content = generateSRT(transcriptionResult);
        filename = `transcript_${audioFile.file.name.replace(/\.[^/.]+$/, "")}.srt`;
        break;
      case 'vtt':
        content = generateVTT(transcriptionResult);
        filename = `transcript_${audioFile.file.name.replace(/\.[^/.]+$/, "")}.vtt`;
        break;
      case 'json':
        content = JSON.stringify(transcriptionResult, null, 2);
        filename = `transcript_${audioFile.file.name.replace(/\.[^/.]+$/, "")}.json`;
        mimeType = 'application/json';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 生成SRT格式
  const generateSRT = (result: TranscriptionResult): string => {
    if (!result.segments) return result.text;

    return result.segments.map((segment, index) => {
      const start = formatTime(segment.start);
      const end = formatTime(segment.end);
      return `${index + 1}\n${start} --> ${end}\n${segment.text}\n`;
    }).join('\n');
  };

  // 生成VTT格式
  const generateVTT = (result: TranscriptionResult): string => {
    if (!result.segments) return `WEBVTT\n\n${result.text}`;

    const vtt = result.segments.map((segment, index) => {
      const start = formatTime(segment.start, true);
      const end = formatTime(segment.end, true);
      return `${start} --> ${end}\n${segment.text}`;
    }).join('\n\n');

    return `WEBVTT\n\n${vtt}`;
  };

  // 时间格式化
  const formatTime = (seconds: number, isVTT = false): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);

    const separator = isVTT ? '.' : ',';
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}${separator}${ms.toString().padStart(3, '0')}`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 语言选项
  const languageOptions = [
    { value: 'auto', label: isZhHans ? '自动检测' : 'Auto Detect' },
    { value: 'en', label: 'English' },
    { value: 'zh', label: '中文' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'pt', label: 'Português' },
    { value: 'ru', label: 'Русский' },
  ];

  // 示例音频文件
  const exampleAudios = [
    {
      name: isZhHans ? "英文播客示例" : "English Podcast",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/english-podcast.mp3",
      description: isZhHans ? "英文播客录音片段" : "English podcast recording segment"
    },
    {
      name: isZhHans ? "中文会议示例" : "Chinese Meeting",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/chinese-meeting.mp3", 
      description: isZhHans ? "中文会议录音片段" : "Chinese meeting recording segment"
    },
    {
      name: isZhHans ? "多语言对话" : "Multilingual Conversation",
      url: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/samples/multilingual.mp3",
      description: isZhHans ? "包含多种语言的对话" : "Conversation with multiple languages"
    }
  ];

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
                    <Icons.fileAudio className="size-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "拖拽音频文件到此处" : "Drag audio file here"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isZhHans ? "或点击选择文件" : "or click to select file"}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {isZhHans ? "支持 MP3、WAV、M4A、OGG、FLAC 格式，最大 100MB" : "Supports MP3, WAV, M4A, OGG, FLAC formats, max 100MB"}
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
                      toast({
                        title: isZhHans ? "示例加载" : "Example Loading",
                        description: isZhHans ? "示例音频加载中..." : "Loading example audio...",
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

            {/* 转录选项 */}
            {audioFile && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "转录选项" : "Transcription Options"}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      {isZhHans ? "语言" : "Language"}
                    </label>
                    <select
                      value={transcriptionOptions.language}
                      onChange={(e) => setTranscriptionOptions(prev => ({
                        ...prev,
                        language: e.target.value
                      }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      {languageOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={transcriptionOptions.includeTimestamps}
                      onChange={(e) => setTranscriptionOptions(prev => ({
                        ...prev,
                        includeTimestamps: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {isZhHans ? "包含时间戳" : "Include Timestamps"}
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={transcriptionOptions.speakerDiarization}
                      onChange={(e) => setTranscriptionOptions(prev => ({
                        ...prev,
                        speakerDiarization: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {isZhHans ? "说话人分离" : "Speaker Diarization"}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：预览和结果 */}
          <div className="space-y-6">
            {/* 音频预览 */}
            {audioFile && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "音频文件" : "Audio File"}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                    <Icons.fileAudio className="size-8 text-blue-600" />
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
                    onClick={handleTranscription}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {isProcessing ? (
                      <>
                        <Icons.spinner className="mr-2 size-4 animate-spin" />
                        {isZhHans ? "转录中..." : "Transcribing..."}
                      </>
                    ) : (
                      <>
                        <Icons.type className="mr-2 size-4" />
                        {isZhHans ? "开始转录" : "Start Transcription"}
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
                  {isZhHans ? "转录进度" : "Transcription Progress"}
                </h3>
                
                <div className="space-y-4">
                  <Progress value={progress} className="w-full" />
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {Math.round(progress)}% {isZhHans ? "完成" : "complete"}
                  </p>
                  <p className="text-center text-xs text-gray-500">
                    {isZhHans ? "正在使用 AI 技术转录音频内容..." : "Using AI technology to transcribe audio content..."}
                  </p>
                </div>
              </div>
            )}

            {/* 转录结果 */}
            {transcriptionResult && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isZhHans ? "转录结果" : "Transcription Result"}
                  </h3>
                  {transcriptionResult.language && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {transcriptionResult.language.toUpperCase()}
                    </span>
                  )}
                </div>
                
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text">{isZhHans ? "文本" : "Text"}</TabsTrigger>
                    <TabsTrigger value="timestamps">{isZhHans ? "时间轴" : "Timestamps"}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="mt-4">
                    <div className="max-h-96 overflow-y-auto rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                      <p className="whitespace-pre-wrap text-sm text-gray-900 dark:text-white">
                        {transcriptionResult.text}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="timestamps" className="mt-4">
                    <div className="max-h-96 space-y-2 overflow-y-auto">
                      {transcriptionResult.segments?.map((segment, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-mono text-xs text-blue-600 dark:text-blue-400">
                              {formatTime(segment.start)} - {formatTime(segment.end)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {segment.text}
                          </p>
                        </div>
                      )) || (
                        <p className="text-center text-gray-500">
                          {isZhHans ? "时间戳信息不可用" : "Timestamp information not available"}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleDownload('txt')}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    <Icons.download className="mr-1 size-3" />
                    TXT
                  </Button>
                  <Button
                    onClick={() => handleDownload('srt')}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    <Icons.download className="mr-1 size-3" />
                    SRT
                  </Button>
                  <Button
                    onClick={() => handleDownload('vtt')}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    <Icons.download className="mr-1 size-3" />
                    VTT
                  </Button>
                  <Button
                    onClick={() => handleDownload('json')}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    <Icons.download className="mr-1 size-3" />
                    JSON
                  </Button>
                </div>
              </div>
            )}

            {/* 空状态 */}
            {!audioFile && (
              <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-12 text-center backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <Icons.type className="mx-auto mb-4 size-16 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "选择音频文件开始转录" : "Select audio file to start transcription"}
                </h3>
                <p className="text-gray-500">
                  {isZhHans 
                    ? "上传您的音频文件，我们将使用 AI 技术将其转换为文字"
                    : "Upload your audio file and we'll convert it to text using AI technology"
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
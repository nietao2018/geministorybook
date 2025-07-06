"use client";

import React, { useState, useRef, useCallback, useContext } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ModalContext } from "@/components/modals/providers";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Icons } from "@/components/shared/icons";

interface SizePreset {
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
}

const sizePresets: SizePreset[] = [
  { name: "Instagram Square", width: 1080, height: 1080, aspectRatio: "1:1" },
  { name: "Instagram Story", width: 1080, height: 1920, aspectRatio: "9:16" },
  { name: "Facebook Cover", width: 1200, height: 630, aspectRatio: "1.91:1" },
  { name: "Twitter Header", width: 1500, height: 500, aspectRatio: "3:1" },
  { name: "LinkedIn Banner", width: 1584, height: 396, aspectRatio: "4:1" },
  { name: "YouTube Thumbnail", width: 1280, height: 720, aspectRatio: "16:9" },
  { name: "Web Banner", width: 1920, height: 1080, aspectRatio: "16:9" },
  { name: "A4 Print", width: 2480, height: 3508, aspectRatio: "A4" },
];

const exampleImages = [
  "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-img/image-resize-1.png",
  "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-img/image-resize-2.png", 
  "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-img/image-resize-3.png",
  "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-img/image-resize-4.png"
];

const ImageResizeClient = () => {
  const params = useParams();
  const { data: session } = useSession();
  const { setShowSignInModal } = useContext(ModalContext);

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<SizePreset | null>(null);
  const [customWidth, setCustomWidth] = useState<number>(1920);
  const [customHeight, setCustomHeight] = useState<number>(1080);
  const [useCustomSize, setUseCustomSize] = useState<boolean>(false);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isZhHans = params.locale === 'zh-hans';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(isZhHans ? "文件大小不能超过10MB" : "File size cannot exceed 10MB");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
        setResizedUrl(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(isZhHans ? "文件大小不能超过10MB" : "File size cannot exceed 10MB");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
        setResizedUrl(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, [isZhHans]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
              setPreviewUrl(reader.result as string);
              setResizedUrl(null);
              setError(null);
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    }
  }, []);

  const handleExampleImageClick = async (imageUrl: string) => {
    try {
      setIsProcessing(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'example.jpg', { type: 'image/jpeg' });
      setImage(file);
      setPreviewUrl(imageUrl);
      setResizedUrl(null);
      setError(null);
    } catch (error) {
      toast.error(isZhHans ? "加载示例图片失败" : "Failed to load example image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResize = async () => {
    if (!image) {
      toast.error(isZhHans ? "请先选择图片" : "Please select an image first");
      return;
    }

    if (!session) {
      setShowSignInModal(true);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', image);
      
      if (useCustomSize) {
        formData.append('width', customWidth.toString());
        formData.append('height', customHeight.toString());
      } else if (selectedPreset) {
        formData.append('width', selectedPreset.width.toString());
        formData.append('height', selectedPreset.height.toString());
      } else {
        toast.error(isZhHans ? "请选择尺寸预设或自定义尺寸" : "Please select a size preset or custom dimensions");
        return;
      }
      
      formData.append('maintainAspectRatio', maintainAspectRatio.toString());

      const response = await fetch('/api/generate/image-resize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to resize image');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResizedUrl(url);
      
      toast.success(isZhHans ? "图片调整完成！" : "Image resized successfully!");
    } catch (error: any) {
      console.error('Resize error:', error);
      setError(error.message || (isZhHans ? "调整失败，请重试" : "Resize failed, please try again"));
      toast.error(error.message || (isZhHans ? "调整失败" : "Resize failed"));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resizedUrl) {
      const link = document.createElement('a');
      link.href = resizedUrl;
      link.download = `resized-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreviewUrl(null);
    setResizedUrl(null);
    setError(null);
    setSelectedPreset(null);
    setUseCustomSize(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add paste event listener
  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  const targetWidth = useCustomSize ? customWidth : selectedPreset?.width || 1920;
  const targetHeight = useCustomSize ? customHeight : selectedPreset?.height || 1080;

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          {/* Upload Area */}
          {!previewUrl ? (
            <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white/80 p-8 backdrop-blur-sm transition-colors hover:border-blue-400 dark:border-gray-600 dark:bg-gray-800/80">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="text-center"
              >
                <div className="mx-auto mb-4 size-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                  <Icons.image className="size-12 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "上传图片" : "Upload Image"}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {isZhHans ? "拖拽图片到此处，或点击选择文件" : "Drag and drop an image here, or click to select"}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-white transition-transform hover:scale-105"
                >
                  {isZhHans ? "选择文件" : "Choose File"}
                </button>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {isZhHans ? "支持 JPG、PNG、WebP 格式，最大 10MB" : "Support JPG, PNG, WebP formats, max 10MB"}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "原始图片" : "Original Image"}
                </h3>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-lg px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <Icons.refresh className="size-4" />
                  {isZhHans ? "重新选择" : "Reset"}
                </button>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Size Presets */}
          <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {isZhHans ? "尺寸预设" : "Size Presets"}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {sizePresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setUseCustomSize(false);
                  }}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    selectedPreset?.name === preset.name && !useCustomSize
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {preset.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {preset.width} × {preset.height} ({preset.aspectRatio})
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Size */}
          <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80">
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="custom-size"
                checked={useCustomSize}
                onChange={(e) => setUseCustomSize(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="custom-size" className="text-lg font-semibold text-gray-900 dark:text-white">
                {isZhHans ? "自定义尺寸" : "Custom Size"}
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isZhHans ? "宽度" : "Width"}
                </label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(parseInt(e.target.value) || 1920)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                  min="1"
                  max="4096"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isZhHans ? "高度" : "Height"}
                </label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(parseInt(e.target.value) || 1080)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                  min="1"
                  max="4096"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {isZhHans ? "保持宽高比" : "Maintain aspect ratio"}
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleResize}
              disabled={!image || isProcessing || (!selectedPreset && !useCustomSize)}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <Icons.spinner className="size-4 animate-spin" />
                  {isZhHans ? "处理中..." : "Processing..."}
                </div>
              ) : (
                isZhHans ? "调整图片" : "Resize Image"
              )}
            </button>
          </div>
        </div>

        {/* Right Column - Preview & Result */}
        <div className="space-y-6">
          {/* Example Images */}
          {!previewUrl && (
            <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {isZhHans ? "示例图片" : "Example Images"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {exampleImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleImageClick(imgUrl)}
                    className="relative aspect-square overflow-hidden rounded-lg transition-transform hover:scale-105"
                  >
                    <Image
                      src={imgUrl}
                      alt={`Example ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Preview Size Info */}
          {(selectedPreset || useCustomSize) && (
            <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {isZhHans ? "目标尺寸" : "Target Size"}
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {targetWidth} × {targetHeight}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {useCustomSize ? (isZhHans ? "自定义尺寸" : "Custom Size") : selectedPreset?.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {(targetWidth * targetHeight / 1000000).toFixed(1)}MP
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {isZhHans ? "百万像素" : "Megapixels"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Result */}
          {resizedUrl && (
            <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isZhHans ? "调整结果" : "Resized Image"}
                </h3>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
                >
                  <Icons.download className="size-4" />
                  {isZhHans ? "下载" : "Download"}
                </button>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                <Image
                  src={resizedUrl}
                  alt="Resized"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Icons.warning className="size-5" />
                <span className="font-medium">{isZhHans ? "错误" : "Error"}</span>
              </div>
              <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageResizeClient;
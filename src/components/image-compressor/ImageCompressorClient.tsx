"use client";

import { useState, useRef, useCallback, useContext } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ModalContext } from "@/components/modals/providers";
import { toast } from "sonner";

interface CompressionSettings {
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
  maxWidth?: number;
  maxHeight?: number;
}

const ImageCompressorClient = () => {
  const params = useParams();
  const { setShowSignInModal } = useContext(ModalContext);

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressionSettings, setCompressionSettings] = useState<CompressionSettings>({
    quality: 85,
    format: 'jpeg',
    maxWidth: 1920,
    maxHeight: 1080
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResultUrl(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResultUrl(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          setImage(file);
          setOriginalSize(file.size);
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
          setResultUrl(null);
          setError(null);
          break;
        }
      }
    }
  };

  const handleCompress = async () => {
    if (!image) return;
    
    try {
      setIsProcessing(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('image', image);
      formData.append('quality', compressionSettings.quality.toString());
      formData.append('format', compressionSettings.format);
      if (compressionSettings.maxWidth) {
        formData.append('maxWidth', compressionSettings.maxWidth.toString());
      }
      if (compressionSettings.maxHeight) {
        formData.append('maxHeight', compressionSettings.maxHeight.toString());
      }

      const response = await fetch('/api/generate/image-compressor', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (response.status === 401) {
        setShowSignInModal(true);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to compress image');
        setIsProcessing(false);
        return;
      }

      const blob = await response.blob();
      const compressedImageUrl = URL.createObjectURL(blob);
      setResultUrl(compressedImageUrl);
      setCompressedSize(blob.size);
      setIsProcessing(false);
      toast.success("Image compressed successfully!");
    } catch (e) {
      console.error(e);
      setError('Failed to compress image. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!resultUrl) return;
    
    try {
      const response = await fetch(resultUrl);
      const blob = await response.blob();
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `compressed-image.${compressionSettings.format}`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      setError('Download failed, please retry!');
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setError(null);
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionRatio = originalSize > 0 && compressedSize > 0 
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0;

  const sampleImages = [
    '/_static/image-compressor/sample1.jpg',
    '/_static/image-compressor/sample2.jpg',
    '/_static/image-compressor/sample3.jpg',
    '/_static/image-compressor/sample4.jpg',
  ];

  return (
    <section className="relative py-4">
      <div className="mx-auto max-w-7xl px-4">
        <div 
          className="mx-auto flex min-h-[600px] max-w-5xl flex-col items-center justify-center"
          onPaste={handlePaste}
        >
          <div className="w-full text-center">
            {previewUrl ? (
              <div className="mb-8">
                <div className="mb-6 grid gap-6 lg:grid-cols-2">
                  {/* Original Image */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="size-2 rounded-full bg-blue-500"></div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {params.locale === 'zh-hans' ? '原始图片' : 'Original Image'}
                      </h3>
                    </div>
                    <div className="group relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                      <Image 
                        src={previewUrl} 
                        alt="Original image" 
                        fill
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="rounded-lg bg-gray-100/80 p-3 text-sm text-gray-600 dark:bg-gray-800/80 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>{params.locale === 'zh-hans' ? '文件大小:' : 'File Size:'}</span>
                        <span className="font-medium">{formatFileSize(originalSize)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Compressed Image */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="size-2 rounded-full bg-green-500"></div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {params.locale === 'zh-hans' ? '压缩后' : 'Compressed'}
                      </h3>
                    </div>
                    <div className="group relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                      {resultUrl ? (
                        <Image 
                          src={resultUrl} 
                          alt="Compressed image" 
                          fill
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                          <div className="text-center">
                            <div className="mb-2">
                              <svg className="mx-auto size-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p>{params.locale === 'zh-hans' ? '压缩后的图片将显示在这里' : 'Compressed image will appear here'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="rounded-lg bg-gray-100/80 p-3 text-sm text-gray-600 dark:bg-gray-800/80 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>{params.locale === 'zh-hans' ? '文件大小:' : 'File Size:'}</span>
                        <span className="font-medium">
                          {compressedSize > 0 ? formatFileSize(compressedSize) : '-'}
                        </span>
                      </div>
                      {compressionRatio > 0 && (
                        <div className="mt-1 flex justify-between">
                          <span>{params.locale === 'zh-hans' ? '压缩率:' : 'Compression:'}</span>
                          <span className="font-medium text-green-600">{compressionRatio}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Compression Settings */}
                <div className="mb-6 rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {params.locale === 'zh-hans' ? '压缩设置' : 'Compression Settings'}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {params.locale === 'zh-hans' ? '质量' : 'Quality'} ({compressionSettings.quality}%)
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={compressionSettings.quality}
                        onChange={(e) => setCompressionSettings({...compressionSettings, quality: parseInt(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {params.locale === 'zh-hans' ? '格式' : 'Format'}
                      </label>
                      <select
                        value={compressionSettings.format}
                        onChange={(e) => setCompressionSettings({...compressionSettings, format: e.target.value as 'jpeg' | 'png' | 'webp'})}
                        className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                      >
                        <option value="jpeg">JPEG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WebP</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {params.locale === 'zh-hans' ? '最大宽度' : 'Max Width'}
                      </label>
                      <input
                        type="number"
                        value={compressionSettings.maxWidth}
                        onChange={(e) => setCompressionSettings({...compressionSettings, maxWidth: parseInt(e.target.value)})}
                        className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                        placeholder="1920"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {params.locale === 'zh-hans' ? '最大高度' : 'Max Height'}
                      </label>
                      <input
                        type="number"
                        value={compressionSettings.maxHeight}
                        onChange={(e) => setCompressionSettings({...compressionSettings, maxHeight: parseInt(e.target.value)})}
                        className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                        placeholder="1080"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 rounded-xl border border-red-200/50 bg-red-50/80 p-4 text-red-600 backdrop-blur-sm dark:border-red-700/50 dark:bg-red-900/30 dark:text-red-400">
                    <div className="flex items-center gap-2">
                      <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap justify-center gap-3">
                  <button 
                    onClick={handleReset}
                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-gray-600 hover:to-gray-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isProcessing}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {params.locale === 'zh-hans' ? '重置' : 'Reset'}
                  </button>
                  
                  <button 
                    onClick={handleCompress}
                    className={`group flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed ${
                      isProcessing 
                        ? 'bg-gradient-to-r from-gray-400 to-gray-500' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    }`}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {params.locale === 'zh-hans' ? '压缩中...' : 'Compressing...'}
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                        </svg>
                        {params.locale === 'zh-hans' ? '压缩图片 (2积分)' : 'Compress Image (2 credits)'}
                      </>
                    )}
                  </button>
                  
                  {resultUrl && (
                    <button 
                      onClick={handleDownload}
                      className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-purple-600 hover:to-purple-700 hover:shadow-xl"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {params.locale === 'zh-hans' ? '下载压缩图片' : 'Download Compressed'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div 
                className="group mb-8 flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300/60 bg-white/70 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/80 hover:bg-blue-50/30 hover:shadow-xl dark:border-gray-500/60 dark:bg-gray-800/70 dark:hover:border-blue-400/80 dark:hover:bg-blue-900/20"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="mb-6 rounded-full bg-gradient-to-r from-blue-500/90 to-purple-500/90 p-4 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                
                <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {params.locale === 'zh-hans' ? '上传您的图片' : 'Upload Your Image'}
                </h3>
                
                <p className="mb-6 max-w-md text-center text-gray-600 dark:text-gray-400">
                  {params.locale === 'zh-hans' 
                    ? '拖拽图片到这里，或点击浏览文件' 
                    : 'Drag & drop your image here, or click to browse'
                  }
                </p>
                
                <div className="flex flex-col items-center gap-3 text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      JPG, PNG, WebP
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Up to 10MB
                    </span>
                  </div>
                  <p>{params.locale === 'zh-hans' ? '您也可以粘贴图片' : 'You can also paste an image'}</p>
                </div>
              </div>
            )}

            {!previewUrl && (
              <div className="mt-12">
                <h4 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {params.locale === 'zh-hans' ? '没有图片？试试这些示例：' : 'No image? Try one of these examples:'}
                </h4>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {sampleImages.map((src, index) => (
                    <div 
                      key={index}
                      className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-200/50 bg-white/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/80 hover:shadow-lg dark:border-gray-600/50 dark:bg-gray-800/80 dark:hover:border-blue-400/80"
                      onClick={() => setPreviewUrl(src)}
                    >
                      <div className="relative h-32 w-full">
                        <Image 
                          src={src} 
                          alt={`Example ${index + 1}`} 
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 rounded-xl border border-gray-200/50 bg-white/60 p-6 text-center backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/60">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {params.locale === 'zh-hans' 
                  ? '上传图片即表示您同意我们的'
                  : 'By uploading an image you agree to our'
                }{' '}
                <a href="#" className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400">
                  {params.locale === 'zh-hans' ? '服务条款' : 'Terms of Service'}
                </a>{' '}
                {params.locale === 'zh-hans' ? '和' : 'and'}{' '}
                <a href="#" className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400">
                  {params.locale === 'zh-hans' ? '隐私政策' : 'Privacy Policy'}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCompressorClient;
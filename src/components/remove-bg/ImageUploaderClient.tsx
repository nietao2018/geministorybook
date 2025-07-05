"use client";

import { useState, useRef, useCallback, useContext } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ModalContext } from "@/components/modals/providers";
import { toast } from "sonner";

const ImageUploaderClient = () => {
  const params = useParams();
  const { setShowSignInModal } = useContext(ModalContext);

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 这里是您原来的所有代码...
  // 复制您原来的所有函数和JSX到这里

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
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
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const url = e.target.elements.url.value;
    if (url) {
      setPreviewUrl(url);
    }
  };

  const handleRemoveBg = async () => {
    if (!previewUrl) return;
    
    try {
      setIsProcessing(true);
      setError(null);
      
      // If previewUrl is a URL rather than base64, fetch and convert to base64
      let imageBase64 = previewUrl;
      if (previewUrl.startsWith('http') || previewUrl.startsWith('/')) {
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result as string);
            } else {
              resolve(''); // 提供一个默认值，避免null
            }
          };
          reader.readAsDataURL(blob);
        });
      }
      
      imageBase64 = imageBase64.toString().replace(/^data:image\/\w+;base64,/, '')
      // Prepare image data, remove base64 prefix

        // Simulate API call
        const response = await fetch('/api/replicate/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                input: {
                    image: `data:image/jpeg;base64,${imageBase64}`,
                },
                useCredit: 5,
                model: 'removeBg',
                type: 'version'
            }),
        });

        if (response.status === 401) {
            setShowSignInModal(true);
            return;
        }
        if (response.status === 201) {
            console.error("ad", response.status)
            setIsProcessing(false)
            // @ts-ignore
            toast.error("Insufficient credits, please purchase more.");
            return;
        }

        const data = await response.json();
        data.id && await pollPredictionResult(data.id);
    } catch(e) {
        console.error(e)
    } finally {
    }
  };

  // 添加轮询函数
  const pollPredictionResult = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/prediction/${id}/get`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get prediction: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Polling result:', data);
      
      if (data.status === 'completed' && data.imageUrl) {
        // 处理成功，设置结果图片
        setResultUrl(data.imageUrl);
        setIsProcessing(false);
      } else if (data.status === 'failed') {
        // 处理失败
        setError('Background removal failed: ' + (data.error || 'Unknown error'));
        setIsProcessing(false);
      } else if (['processing', 'starting'].includes(data.status)) {
        // 继续轮询
        setTimeout(() => pollPredictionResult(id), 1000);
      }
    } catch (err) {
      console.error('Error polling for result:', err);
      setError('Error checking processing status');
      setIsProcessing(false);
    }
  }, []);

  const handleChangeImage = () => {
    setPreviewUrl(null);
    setResultUrl(null);
    setImage(null);
    setError(null);
    // 重置文件输入框后再触发点击
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.click();
      }
    }, 0);
  };

  const sampleImages = [
    '/_static/removebg/sample1.png',
    '/_static/removebg/sample2.png',
    '/_static/removebg/sample3.png',
    '/_static/removebg/sample4.png',
  ];

  // 修改下载图片的函数
  const handleDownload = async () => {
    if (!resultUrl) return;
    
    try {
      // 使用代理API获取图片数据
      const response = await fetch('/api/image/download', {
        method: 'POST',
        body: JSON.stringify({ imageUrl: resultUrl }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status}`);
      }
      
      const blob = await response.blob();
      
      // 创建一个临时的下载链接
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'removed-background.png';
      document.body.appendChild(a);
      a.click();
      
      // 清理
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      setError('download image failed, please retry!');
    }
  };

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
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex-1">
                <div className="mb-3 flex items-center justify-center gap-2">
                  <div className="size-2 rounded-full bg-blue-500"></div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Original</h3>
                </div>
                <div className="group relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80">
                  <Image 
                    src={previewUrl} 
                    alt="Preview image" 
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              
              {resultUrl && (
                <div className="flex-1">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Result</h3>
                  </div>
                  <div 
                    className="checkerboard-transparent group relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200/50 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-600/50"
                  >
                    <Image 
                      src={resultUrl} 
                      alt="Processed image" 
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {error && (
              <div className="mt-6 rounded-xl border border-red-200/50 bg-red-50/80 p-4 text-red-600 backdrop-blur-sm dark:border-red-700/50 dark:bg-red-900/30 dark:text-red-400">
                <div className="flex items-center gap-2">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button 
                onClick={handleChangeImage}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isProcessing}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Change Image
              </button>
              <button 
                onClick={handleRemoveBg}
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
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                    Remove Background (5 credits)
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
                  Download Result
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
              Upload Your Image
            </h3>
            
            <p className="mb-6 max-w-md text-center text-gray-600 dark:text-gray-400">
              Drag & drop your image here, or click to browse
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
                  Up to 2MB
                </span>
              </div>
              <p>You can also paste an image or use URL</p>
            </div>
          </div>
        )}

        {!previewUrl && (
          <div className="mt-12">
            <h4 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
              No image? Try one of these examples:
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
            By uploading an image you agree to our{' '}
            <a href="#" className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400">
              Privacy Policy
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

export default ImageUploaderClient;

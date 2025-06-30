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
    <div 
      className="mx-auto flex min-h-screen max-w-[1150px] flex-col items-center justify-center rounded-3xl bg-white dark:bg-[#18181b]"
      onPaste={handlePaste}
    >
      <div 
      className="mx-auto flex min-h-screen max-w-[1150px] flex-col items-center justify-center bg-white dark:bg-[#18181b]"
      onPaste={handlePaste}
      >
      <div className="w-full max-w-2xl text-center">

        {previewUrl ? (
          <div className="mb-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <p className="mb-2 text-gray-700 dark:text-gray-300">Original</p>
                <div className="relative h-64 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <Image 
                    src={previewUrl} 
                    alt="Preview image" 
                    layout="fill" 
                    objectFit="contain"
                  />
                </div>
              </div>
              
              {resultUrl && (
                <div className="flex-1">
                  <p className="mb-2 text-gray-700 dark:text-gray-300">Result</p>
                  <div className="relative h-64 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <Image 
                      src={resultUrl} 
                      alt="Processed image" 
                      layout="fill" 
                      objectFit="contain"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {error && (
              <div className="mt-4 rounded bg-red-100 p-2 text-red-500 dark:bg-red-900">
                {error}
              </div>
            )}
            
            <div className="mt-4 flex justify-center gap-4">
              <button 
                onClick={handleChangeImage}
                className="flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                disabled={isProcessing}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Change Image
              </button>
              <button 
                onClick={handleRemoveBg}
                className={`px-4 py-2 ${isProcessing ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} flex items-center rounded-lg text-white transition`}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg className="mr-2 size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                    RemoveBg (5 credits)
                  </>
                )}
              </button>
              
              {resultUrl && (
                <button 
                  onClick={handleDownload}
                  className="flex items-center rounded-lg bg-purple-500 px-4 py-2 text-white transition hover:bg-purple-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Result
                </button>
              )}
            </div>
          </div>
        ) : (
          <div 
            className="mb-6 flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 dark:border-gray-700"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="mb-4 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-600"
            >
              Upload Image
            </button>
            
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">or drop a file,</p>
            <div className="mt-2 flex items-center">
              <p className="text-gray-600 dark:text-gray-300">paste image or</p>
              <form onSubmit={handleUrlSubmit} className="ml-1 inline-flex">
                <input type="text" name="url" placeholder="URL" className="hidden" />
                <button type="submit" className="text-blue-500 underline">URL</button>
              </form>
            </div>
          </div>
        )}

        {!previewUrl && (
          <div className="mt-8">
            <p className="mb-4 text-gray-600 dark:text-gray-300">No image? Try one of these：</p>
            <div className="grid grid-cols-4 gap-4">
              {sampleImages.map((src, index) => (
                <div 
                  key={index}
                  className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition hover:border-blue-500 dark:border-gray-800"
                  onClick={() => setPreviewUrl(src)}
                >
                  <div className="relative h-24 w-full">
                    <Image 
                      src={src} 
                      alt={`示例 ${index + 1}`} 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
          <p>
            By uploading an image or URL you agree to our <a href="#" className="underline">Terms of Service</a>. 
            To learn more about how remove.bg handles your personal data, check our <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ImageUploaderClient;

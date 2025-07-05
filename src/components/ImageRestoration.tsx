'use client';

import React, { useState,  useCallback, useContext } from 'react';
import { ModalContext } from "@/components/modals/providers";
import { useRouter } from 'next/navigation';
interface ImageRestorationProps {
  // 你可能需要在这里添加一些 props，例如处理函数或默认图片
}

const ImageRestoration: React.FC<ImageRestorationProps> = () => {
  const { setShowSignInModal } = useContext(ModalContext);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); // This will store the user's uploaded/URL image
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null); // This will store the processed image result
  const [watermark, setWatermark] = useState<boolean>(true);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 初始位置为50%
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading indicator
  const [error, setError] = useState<string | null>(null); // New state for error messages
  const [predictionId, setPredictionId] = useState<string | null>(null);

  // Hardcoded example images for the slider
  const beforeExampleUrl = 'https://s.magicaitool.com/flux-ai/flux-kontext-apps/restore-image/before.jpg';
  const afterExampleUrl = 'https://s.magicaitool.com/flux-ai/flux-kontext-apps/restore-image/after.jpg';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageUrl(reader.result as string);
        setRestoredImageUrl(null); // Clear any previous restored image
        setError(null); // Clear any previous errors
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedImageUrl(event.target.value);
    setRestoredImageUrl(null); // Clear any previous restored image
    setError(null); // Clear any previous errors
  };

  const handleGenerate = async () => {
    if (!uploadedImageUrl) {
      setError("请上传图片或输入图片URL。");
      return;
    }

    try {
      // 先检查用户积分
      const creditsResponse = await fetch('/api/user/credits/check', {
        method: 'GET',
        credentials: 'include',
      });

      if (creditsResponse.status === 401) {
        setShowSignInModal(true);
        return;
      }

      if (!creditsResponse.ok) {
        throw new Error('获取用户积分失败');
      }

      const { credits } = await creditsResponse.json();
      
      if (credits < 5) {
        setError(`积分不足，当前积分：${credits}，需要5积分才能生成图片。`);
        return;
      }

      setIsLoading(true);
      setError(null);
      setRestoredImageUrl(null);

      let imageUrl = uploadedImageUrl;

      if (!uploadedImageUrl.startsWith('http')) {
        try {
          const fileName = `restoration-${Date.now()}.png`;
          
          const uploadResponse = await fetch('/api/image/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              image: uploadedImageUrl,
              fileName: fileName,
            }),
          });

          if (uploadResponse.status === 401) {
            setShowSignInModal(true);
            return;
          }

          if (!uploadResponse.ok) {
            throw new Error('上传图片失败');
          }

          const uploadData = await uploadResponse.json();
          imageUrl = uploadData.url;
        } catch (uploadError) {
          console.error('上传错误:', uploadError);
          throw new Error('上传图片到存储失败');
        }
      }

      const response = await fetch('/api/generate/image-restoration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          image: imageUrl,
        }),
      });

      if (response.status === 401) {
        setShowSignInModal(true);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '图片处理失败。');
      }
      
      const data = await response.json();
      setPredictionId(data.id);
      
      if (data.id) {
        await pollPredictionResult(data.id);
      }
    } catch (err) {
      console.error('生成错误:', err);
      setError((err as Error).message || '图片处理过程中发生未知错误。');
      setRestoredImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

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
      
      if (data.status === 'completed' && data.imageUrl) {
        setRestoredImageUrl(data.imageUrl);
        setSliderPosition(100);
        setIsLoading(false);
      } else if (data.status === 'failed') {
        setError('Background removal failed: ' + (data.error || 'Unknown error'));
        setIsLoading(false);
      } else if (['processing', 'starting'].includes(data.status)) {
        setTimeout(() => pollPredictionResult(id), 1000);
      }
    } catch (err) {
      console.error('Error polling for result:', err);
      setError('Error checking processing status');
      setIsLoading(false);
    }
  }, [setShowSignInModal]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(event.target.value));
  };

  // Determine which images to display
  let displayBeforeImage = beforeExampleUrl;
  let displayAfterImage = afterExampleUrl;
  let previewContent;

  if (isLoading) {
    previewContent = (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
        <div className="text-center">
          <p className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Processing your image...</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">This may take 30s - 1min</p>
        </div>
      </div>
    );
  } else if (error) {
    previewContent = (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50">
          <svg className="size-8 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="mb-2 text-lg font-semibold text-red-600 dark:text-red-400">Processing Failed</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Please try uploading a different image or check the URL</p>
      </div>
    );
  } else if (uploadedImageUrl && !restoredImageUrl) {
    // 只显示图片，不显示提示文字
    previewContent = (
      <div className="relative flex h-full items-center justify-center">
        <img src={uploadedImageUrl} alt="Uploaded Image" className="max-h-full max-w-full rounded-lg object-contain" />
      </div>
    );
  } else if (uploadedImageUrl && restoredImageUrl) {
    // User has uploaded an image AND it has been processed
    displayBeforeImage = restoredImageUrl;
    displayAfterImage = uploadedImageUrl;
    previewContent = (
      <>
        <img src={displayBeforeImage} alt="Before" className="absolute left-0 top-0 size-full object-contain" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }} />
        <img src={displayAfterImage} alt="After" className="absolute left-0 top-0 size-full object-contain" style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} />

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 z-10 size-full cursor-ew-resize opacity-0"
          aria-label="Image comparison slider"
        />

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-1 bg-white dark:bg-gray-600"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow-lg group-active:cursor-grabbing dark:border-gray-600 dark:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 rotate-90 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-lg bg-black/70 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">Before</span>
        <span className="absolute right-4 top-4 rounded-lg bg-black/70 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">After</span>
      </>
    );
  } else {
    // Default: show example images Before & After slider with placeholder
    previewContent = (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          <svg className="size-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Upload an image to get started</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Your restored image will appear here</p>
      </div>
    );
  }

  return (
    <section className="relative py-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Section - Controls */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upload Your Photo
                </h3>
              </div>
              
              {/* Upload Area */}
              <div
                className="rounded-2xl border-2 border-dashed border-gray-300/60 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-50/30 dark:border-gray-500/60 dark:bg-gray-800/50 dark:hover:border-blue-400/60 dark:hover:bg-blue-900/20"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    const file = e.dataTransfer.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setUploadedImageUrl(reader.result as string);
                      setRestoredImageUrl(null);
                      setError(null);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                    <svg
                      className="size-8 text-blue-600 dark:text-blue-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l-1.76-1.76a4 4 0 00-5.656 0L17 32M6 20v-8a2 2 0 012-2h8M42 20v-8a2 2 0 00-2-2h-8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <span>Drag & drop your photo here or click to browse</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        onChange={handleFileChange} 
                        accept="image/png, image/jpeg, image/jpg, image/webp" 
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG or WEBP (max 10MB)
                  </p>
                </div>
              </div>
              
              {/* URL Input */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Or enter image URL"
                  className="w-full rounded-xl border border-gray-200/50 bg-white/50 px-4 py-3 text-gray-900 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:border-gray-600/50 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-400"
                  onChange={handleUrlChange}
                  value={uploadedImageUrl || ''}
                />
              </div>
            </div>
            
            {/* Settings */}
            <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              <h4 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                Settings
              </h4>
              
              {/* Watermark Toggle */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Watermark</span>
                <label htmlFor="watermark-toggle" className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    id="watermark-toggle"
                    className="peer sr-only"
                    checked={watermark}
                    onChange={() => setWatermark(!watermark)}
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
              </div>
              
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isLoading || !uploadedImageUrl}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L20 20m-6-6l2 2m-3-6a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Generate (5 Credits)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Section - Preview */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Result Preview
                </h3>
              </div>
              
              {error && (
                <div className="mb-6 rounded-xl border border-red-200/50 bg-red-50/80 p-4 text-red-600 backdrop-blur-sm dark:border-red-700/50 dark:bg-red-900/30 dark:text-red-400">
                  <div className="flex items-center gap-2">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Error:</span> {error}
                  </div>
                </div>
              )}
              
              <div className="group relative h-[500px] w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900">
                {previewContent}
              </div>
              
              {restoredImageUrl && (
                <div className="mt-6">
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Drag the slider to compare before and after
                  </p>
                  <div className="flex justify-center">
                    <a
                      href={restoredImageUrl}
                      download="restored-image.jpg"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Result
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageRestoration;
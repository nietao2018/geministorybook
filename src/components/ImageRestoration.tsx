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
      <div className="flex size-full flex-col items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Processing, please wait...</p>
        <div className="mt-4 size-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  } else if (error) {
    previewContent = (
      <div className="flex size-full flex-col items-center justify-center text-red-500 dark:text-red-400">
        <p>Error: {error}</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please try re-uploading the image or checking the URL.</p>
      </div>
    );
  } else if (uploadedImageUrl && !restoredImageUrl) {
    // 只显示图片，不显示提示文字
    previewContent = (
      <div className="relative flex size-full items-center justify-center">
        <img src={uploadedImageUrl} alt="Uploaded Image" className="size-full object-cover" />
      </div>
    );
  } else if (uploadedImageUrl && restoredImageUrl) {
    // User has uploaded an image AND it has been processed
    displayBeforeImage = restoredImageUrl;
    displayAfterImage = uploadedImageUrl;
    previewContent = (
      <>
        <img src={displayBeforeImage} alt="Before" className="absolute left-0 top-0 size-full object-cover" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }} />
        <img src={displayAfterImage} alt="After" className="absolute left-0 top-0 size-full object-cover" style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} />

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
          <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white shadow-md group-active:cursor-grabbing dark:bg-gray-700">
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
        <span className="absolute left-2 top-2 rounded bg-black/[50%] px-2 py-1 text-xs text-white">Before</span>
        <span className="absolute right-2 top-2 rounded bg-black/[50%] px-2 py-1 text-xs text-white">After</span>
      </>
    );
  } else {
    // Default: show example images Before & After slider
    previewContent = (
      <>
        <img src={displayBeforeImage} alt="Before" className="absolute left-0 top-0 size-full object-cover" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }} />
        <img src={displayAfterImage} alt="After" className="absolute left-0 top-0 size-full object-cover" style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} />

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
          <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white shadow-md group-active:cursor-grabbing dark:bg-gray-700">
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
        <span className="absolute left-2 top-2 rounded bg-black/[50%] px-2 py-1 text-xs text-white">Before</span>
        <span className="absolute right-2 top-2 rounded bg-black/[50%] px-2 py-1 text-xs text-white">After</span>
      </>
    );
  }

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 p-4 lg:flex-row">
      {/* Left Section */}
      <div className="flex-1 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Restore Image | Flux Kontext App</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Restore your old photo to a fresh state</p>

        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Image Processing Settings</h2>

        <div className="mb-6">
          <h3 className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Image (Optional)</h3>
          <div className="mb-4 flex items-center space-x-2">
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">URL</button>
          </div>
          <div
            className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 dark:border-gray-600"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setUploadedImageUrl(reader.result as string);
                  setRestoredImageUrl(null); // Clear processed image on new upload
                  setError(null); // Clear any previous errors
                };
                reader.readAsDataURL(file);
              }
            }}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto size-12 text-gray-400 dark:text-gray-500"
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
              <div className="flex text-sm text-gray-600 dark:text-gray-300">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  <span>Drag & drop or </span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg, image/webp" />
                </label>
                <p className="pl-1">browse</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, JPEG or WEBP (max 10MB)
              </p>
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter image URL"
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:text-sm"
            onChange={handleUrlChange}
            value={uploadedImageUrl || ''} // Bind input value to state for clearing
          />
        </div>

        <div className="mb-6">
          <h3 className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Seed</h3>
          {/* Assuming Seed is an expandable area, currently a placeholder */}
          <div className="flex h-10 items-center justify-center rounded-md border border-gray-300 text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500">
            Dropdown placeholder
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-200">Watermark</h3>
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

        <button
          onClick={handleGenerate}
          className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-3 text-lg font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 size-6"
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
          Generate 5 Credits
        </button>
      </div>

      {/* Right Section */}
      <div className="flex-1 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Flux Kontext Restore Image Result</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">The modified image results will appear here.</p>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Result Time 30s - 1min</p>

        <div className="group relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-md dark:bg-gray-900">
          {previewContent}
        </div>
      </div>
    </div>
  );
};

export default ImageRestoration;
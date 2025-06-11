'use client';

import React, { useState } from 'react';

interface ImageRestorationProps {
  // 你可能需要在这里添加一些 props，例如处理函数或默认图片
}

const ImageRestoration: React.FC<ImageRestorationProps> = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); // This will store the user's uploaded/URL image
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null); // This will store the processed image result
  const [watermark, setWatermark] = useState<boolean>(true);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 初始位置为50%

  // Hardcoded example images for the slider
  const beforeExampleUrl = 'https://s.magicaitool.com/flux-ai/flux-kontext-apps/restore-image/before.jpg';
  const afterExampleUrl = 'https://s.magicaitool.com/flux-ai/flux-kontext-apps/restore-image/after.jpg';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageUrl(reader.result as string); // Set the user's input image
        setRestoredImageUrl(null); // Clear any previous restored image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedImageUrl(event.target.value);
    setRestoredImageUrl(null); // Clear any previous restored image
  };

  const handleGenerate = () => {
    // 处理图片生成逻辑
    console.log('Generate button clicked!');
    console.log('Input Image URL:', uploadedImageUrl);
    console.log('Watermark:', watermark);
    // Simulate image processing: set the restored image to a placeholder or the same as uploaded for now
    if (uploadedImageUrl) {
      // In a real app, this would be a network request and set the actual restored image.
      // For demo purposes, let's just use the 'afterExampleUrl' as a placeholder for the restored image
      setRestoredImageUrl(afterExampleUrl);
    } else {
      // If no image uploaded, generating still means using example images.
      setRestoredImageUrl(afterExampleUrl);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(event.target.value));
  };

  // Determine which images to display
  let displayBeforeImage = beforeExampleUrl;
  let displayAfterImage = afterExampleUrl;
  let previewMessage = "上传或输入图片URL以查看结果";

  if (uploadedImageUrl && !restoredImageUrl) {
    // User has uploaded an image, but it's not yet processed
    previewMessage = "您的上传图片 (暂无处理后图片)";
  } else if (uploadedImageUrl && restoredImageUrl) {
    // User has uploaded an image AND it has been processed
    displayBeforeImage = uploadedImageUrl;
    displayAfterImage = restoredImageUrl;
  }
  // If neither uploadedImageUrl nor restoredImageUrl, default to example images (handled by initial assignment)


  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 p-4 lg:flex-row">
      {/* 左侧区域 */}
      <div className="flex-1 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Restore Image | Flux Kontext App</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Restore your old photo to a fresh state</p>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Image (Optional)</label>
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
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Seed</label>
          {/* 假设 Seed 是一个可展开的区域，目前只是占位符 */}
          <div className="flex h-10 items-center justify-center rounded-md border border-gray-300 text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500">
            下拉菜单占位符
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <label htmlFor="watermark-toggle" className="flex cursor-pointer items-center">
            <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-200">Watermark</span>
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

      {/* 右侧区域 */}
      <div className="flex-1 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Flux Kontext Restore Image Result</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">The modified image results will appear here.</p>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Result Time 30s - 1min</p>

        <div className="group relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-md dark:bg-gray-900">
          {(uploadedImageUrl && !restoredImageUrl) ? (
            // Show single uploaded image preview
            <div className="relative flex size-full items-center justify-center">
              <img src={uploadedImageUrl} alt="Uploaded Image" className="size-full object-cover" />
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-black/70 px-3 py-1 text-white">
                {previewMessage}
              </p>
            </div>
          ) : (
            // Show Before & After slider (either with examples or uploaded/restored)
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
              <span className="absolute left-2 top-2 rounded bg-black/50 px-2 py-1 text-xs text-white">Before</span>
              <span className="absolute right-2 top-2 rounded bg-black/50 px-2 py-1 text-xs text-white">After</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageRestoration; 
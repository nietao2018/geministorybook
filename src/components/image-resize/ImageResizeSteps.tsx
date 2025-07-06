"use client";

import { useParams } from 'next/navigation';
import { Icons } from '@/components/shared/icons';

export default function ImageResizeSteps() {
  const params = useParams();
  const isZhHans = params.locale === 'zh-hans';

  const steps = [
    {
      icon: 'imageupload',
      title: isZhHans ? '上传图片' : 'Upload Image',
      description: isZhHans 
        ? '选择或拖拽图片文件到上传区域，支持JPG、PNG、WebP格式，最大10MB。您也可以粘贴剪贴板中的图片或选择提供的示例图片。'
        : 'Select or drag an image file to the upload area. Supports JPG, PNG, WebP formats up to 10MB. You can also paste from clipboard or choose from example images.',
    },
    {
      icon: 'sliders',
      title: isZhHans ? '选择尺寸' : 'Choose Size',
      description: isZhHans
        ? '从预设的社交媒体、网页和打印尺寸中选择，或设置自定义宽度和高度。可选择是否保持原始图片的宽高比例。'
        : 'Select from preset social media, web, and print sizes, or set custom width and height. Option to maintain original aspect ratio is available.',
    },
    {
      icon: 'cpu',
      title: isZhHans ? 'AI处理' : 'AI Processing',
      description: isZhHans
        ? '我们的AI智能调整算法将根据目标尺寸优化图片质量，确保在调整尺寸的同时保持最佳的视觉效果和清晰度。'
        : 'Our AI smart resize algorithm optimizes image quality for the target dimensions, ensuring the best visual quality and clarity while resizing.',
    },
    {
      icon: 'download',
      title: isZhHans ? '下载结果' : 'Download Result',
      description: isZhHans
        ? '预览调整后的图片效果，满意后即可一键下载高质量的结果图片。支持PNG格式以保持最佳质量。'
        : 'Preview the resized image and download the high-quality result with one click. Supports PNG format for optimal quality preservation.',
    },
  ];

  return (
    <section className="relative overflow-hidden py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-gray-800/30" />
      
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            {isZhHans ? '简单四步，智能调整图片尺寸' : 'Four Simple Steps to Smart Image Resizing'}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            {isZhHans 
              ? '使用我们的AI图片调整工具，快速将图片调整为任何所需尺寸，保持最佳质量'
              : 'Use our AI image resize tool to quickly adjust images to any desired dimensions while maintaining optimal quality'
            }
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = Icons[step.icon] || Icons.image;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80"
              >
                {/* Step number */}
                <div className="absolute -right-4 -top-4 size-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-center text-lg font-bold text-white shadow-lg">
                  <span className="flex size-full items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {isZhHans ? '立即开始使用' : 'Start Using Now'}
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {isZhHans 
                ? '无需注册，免费使用。支持多种尺寸预设和自定义尺寸，满足各种使用场景需求。'
                : 'No registration required, free to use. Supports multiple size presets and custom dimensions for various use cases.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                <Icons.check className="size-4" />
                {isZhHans ? '免费使用' : 'Free to Use'}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                <Icons.zap className="size-4" />
                {isZhHans ? '快速处理' : 'Fast Processing'}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                <Icons.shield className="size-4" />
                {isZhHans ? '高质量输出' : 'High Quality Output'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
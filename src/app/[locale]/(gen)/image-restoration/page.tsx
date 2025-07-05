import { unstable_setRequestLocale } from 'next-intl/server';
import CTA from '@/components/sections/CTA';
import ImageRestoration from "@/components/ImageRestoration";
import { Metadata } from 'next';
import { env } from "@/env.mjs";
import Features from '@/components/sections/features';


export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: "AI Photo Restoration & Enhancement – Restore Old Photos Online Instantly",
    description: "Bring your old, damaged, or faded photos back to life with advanced AI photo restoration. Instantly remove scratches, repair colors, and enhance details for stunning results. Perfect for preserving memories!",
    alternates: {
      canonical: params.locale === 'en' 
        ? `${env.NEXT_PUBLIC_APP_URL}/image-restoration`
        : `${env.NEXT_PUBLIC_APP_URL}/${params.locale}/image-restoration`,
    },
    keywords: "AI photo restoration, restore old photos, photo enhancement, remove scratches, colorize photos, repair faded images, online photo repair, digital photo restoration, enhance photo details, memory preservation",
  };
}

export default function RemoveBgPage({ params }: { params: { locale: string } }) {
  // 在服务器组件中设置语言环境
  unstable_setRequestLocale(params.locale);

  // 渲染客户端组件
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden pb-4 pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute left-1/3 top-0 size-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 size-80 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue-50/50 via-white/30 to-transparent dark:from-gray-900/50 dark:via-gray-800/30" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <a href="/" className="transition-colors hover:text-blue-600">Home</a>
            <span className="mx-1">/</span>
            <span className="font-medium text-gray-900 dark:text-white">Image Restoration</span>
          </nav>
          
          {/* Page Header */}
          <div className="mb-4 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              AI Photo Restoration
            </h1>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Bring your old, damaged, or faded photos back to life with advanced AI photo restoration. Instantly remove scratches, repair colors, and enhance details for stunning results.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <ImageRestoration />
      <Features />
      <CTA />
    </div>
  );
}

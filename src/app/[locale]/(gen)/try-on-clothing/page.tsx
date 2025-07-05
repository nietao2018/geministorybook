import { unstable_setRequestLocale } from 'next-intl/server';
import CTA from '@/components/sections/CTA';
import TryOnClothing from "@/components/try-on-clothing";
import { Metadata } from 'next';
import { env } from "@/env.mjs";
import Features from '@/components/sections/features';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: "Virtual Clothes Try-On AI Fashion Fitting",
    description: "Try on clothes virtually with AI. Instantly see how different outfits look on you, no need to visit a store. Perfect for online shopping and fashion fun!",
    alternates: {
      canonical: params.locale === 'en' 
        ? `${env.NEXT_PUBLIC_APP_URL}/try-on-clothing`
        : `${env.NEXT_PUBLIC_APP_URL}/${params.locale}/try-on-clothing`,
    },
    keywords: "virtual try-on, AI fashion, online fitting, clothes try-on, smart dressing",
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
            <span className="font-medium text-gray-900 dark:text-white">Try on Clothes</span>
          </nav>
          
          {/* Page Header */}
          <div className="mb-4 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              Virtual Clothes Try-On
            </h1>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Try on clothes virtually with AI. Instantly see how different outfits look on you, no need to visit a store. Perfect for online shopping and fashion fun!
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <TryOnClothing />
      <Features />
      <CTA />
    </div>
  );
}

import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import CTA from '@/components/sections/CTA';
import ImageRestoration from "@/components/phtoto-real-style";
import { Metadata } from 'next';
import { env } from "@/env.mjs";
import Features from '@/components/sections/features';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isChinese = params.locale === 'zh-hans';
  
  return {
    title: isChinese 
      ? "AI动漫转真实照片转换器 – 将动漫角色转换为真实人物"
      : "AI Anime to Realistic Photo Converter – Transform Anime Characters to Real People",
    description: isChinese
      ? "使用我们先进的AI技术将动漫角色和卡通图像转换为逼真的人像照片。瞬间将您喜爱的动漫角色转换为真实照片。完美适用于cosplay、角色设计和创意项目！"
      : "Convert anime characters and cartoon images into photorealistic human portraits with our advanced AI technology. Transform your favorite anime characters into realistic photos instantly. Perfect for cosplay, character design, and creative projects!",
    alternates: {
      canonical: params.locale === 'en' 
        ? `${env.NEXT_PUBLIC_APP_URL}/photo-real-style`
        : `${env.NEXT_PUBLIC_APP_URL}/${params.locale}/photo-real-style`,
    },
    keywords: isChinese
      ? "动漫转真实,动漫角色转换器,卡通转真人,AI动漫转换,逼真动漫,动漫脸转换器,真实角色生成器,动漫肖像转换器,AI角色转换,卡通转人类转换器,动漫转照片,真实动漫艺术,AI肖像生成器,动漫角色转真人,逼真转换器"
      : "anime to realistic, anime character converter, cartoon to real person, AI anime transformation, photorealistic anime, anime face converter, realistic character generator, anime portrait converter, AI character transformation, cartoon to human converter, anime to photo, realistic anime art, AI portrait generator, anime character to real person, photorealistic converter",
  };
}

export default function PhotoRealStylePage({ params }: { params: { locale: string } }) {
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
            <span className="font-medium text-gray-900 dark:text-white">
              {params.locale === 'zh-hans' ? 'AI动漫转真实照片' : 'Photo Real Style'}
            </span>
          </nav>
          
          {/* Page Header */}
          <div className="mb-4 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              {params.locale === 'zh-hans' ? 'AI动漫转真实照片转换器' : 'AI Anime to Realistic Photo Converter'}
            </h1>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {params.locale === 'zh-hans' 
                ? '将您喜爱的动漫角色和卡通图像转换为令人惊叹的逼真人像照片。我们的先进AI技术以令人难以置信的细节和准确性将动漫面孔转换为真实照片。完美适用于cosplay灵感、角色设计和创意项目！'
                : 'Transform your favorite anime characters and cartoon images into stunning photorealistic human portraits. Our advanced AI technology converts anime faces into realistic photos with incredible detail and accuracy. Perfect for cosplay inspiration, character design, and creative projects!'
              }
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

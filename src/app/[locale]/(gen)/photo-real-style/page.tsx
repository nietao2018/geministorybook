import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import CTA from '@/components/sections/CTA';
import ImageRestoration from "@/components/phtoto-real-style";
import { Metadata } from 'next';
import { env } from "@/env.mjs";

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
  return <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        {params.locale === 'zh-hans' ? 'AI动漫转真实照片转换器' : 'AI Anime to Realistic Photo Converter'}
      </h1>
      <h2 className="container mx-auto mb-8 w-full max-w-[1200px] text-center text-xl font-bold">
        {params.locale === 'zh-hans' 
          ? '将您喜爱的动漫角色和卡通图像转换为令人惊叹的逼真人像照片。我们的先进AI技术以令人难以置信的细节和准确性将动漫面孔转换为真实照片。完美适用于cosplay灵感、角色设计和创意项目！'
          : 'Transform your favorite anime characters and cartoon images into stunning photorealistic human portraits. Our advanced AI technology converts anime faces into realistic photos with incredible detail and accuracy. Perfect for cosplay inspiration, character design, and creative projects!'
        }
      </h2>
    </div>
    <ImageRestoration />

    <CTA />
  </>;
}

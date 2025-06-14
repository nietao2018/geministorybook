import { unstable_setRequestLocale } from 'next-intl/server';
import CTA from '@/components/sections/CTA';
import ImageRestoration from "@/components/ImageRestoration";
import { Metadata } from 'next';
import { env } from "@/env.mjs";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    alternates: {
      canonical: params.locale === 'en' 
        ? `${env.NEXT_PUBLIC_APP_URL}/image-restoration`
        : `${env.NEXT_PUBLIC_APP_URL}/${params.locale}/image-restoration`,
    },
    description: 'Transform your old photos with AI-powered restoration. Remove scratches, fix colors, and enhance details to bring your memories back to life.',
  };
}

export default function RemoveBgPage({ params }: { params: { locale: string } }) {
  // 在服务器组件中设置语言环境
  unstable_setRequestLocale(params.locale);

  // 渲染客户端组件
  return <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        { 'AI Photo Restoration & Enhancement' }
      </h1>
    </div>
    <ImageRestoration />

    <CTA />
  </>;
}

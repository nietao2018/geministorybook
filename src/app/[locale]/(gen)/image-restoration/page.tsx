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
  return <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        { 'AI Photo Restoration & Enhancement' }
      </h1>
      <h2 className="container mx-auto mb-8 w-full max-w-[1200px] text-center text-xl font-bold">
        { 'Bring your old, damaged, or faded photos back to life with advanced AI photo restoration. Instantly remove scratches, repair colors, and enhance details for stunning results. Perfect for preserving memories!' }
      </h2>
    </div>
    <ImageRestoration />
    <Features />
    <CTA />
  </>;
}

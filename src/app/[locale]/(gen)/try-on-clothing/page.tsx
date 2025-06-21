import { unstable_setRequestLocale } from 'next-intl/server';
import CTA from '@/components/sections/CTA';
import TryOnClothing from "@/components/try-on-clothing";
import { Metadata } from 'next';
import { env } from "@/env.mjs";

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
  return <>
    <section className="w-full max-w-[1200px] mx-auto px-4 py-8">
      <div className="mb-4 text-left flex flex-row items-center gap-2">
        <a href="/" className="text-primary hover:text-blue-600 transition">Home</a>
        <a href="/try-on-clothing" className="text-primary hover:text-blue-600 transition">{'> Try on Clothes'}</a>
      </div>
      <h1 className="mb-2 text-center text-4xl font-bold">
        { 'Virtual Clothes Try-On AI Fashion Fitting' }
      </h1>
      <h2 className="mb-8 text-center text-xl font-bold">
        { 'Try on clothes virtually with AI. Instantly see how different outfits look on you, no need to visit a store. Perfect for online shopping and fashion fun!' }
      </h2>
      <TryOnClothing />
    </section>
    <CTA />
  </>;
}

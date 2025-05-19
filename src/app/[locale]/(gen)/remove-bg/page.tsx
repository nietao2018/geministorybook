import { unstable_setRequestLocale } from 'next-intl/server';
import ImageUploaderClient from './ImageUploaderClient';
import HeroLanding from '@/components/sections/hero-landing';
import PreviewLanding from '@/components/sections/preview-landing';
import StepsSection from '@/components/sections/steps';
import BentoGrid from '@/components/sections/bentogrid';
import InfoLanding from '@/components/sections/info-landing';
import Features from '@/components/sections/features';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/CTA';

export default function RemoveBgPage({ params }: { params: { locale: string } }) {
  // 在服务器组件中设置语言环境
  unstable_setRequestLocale(params.locale);

  // 渲染客户端组件
  return <>
    <ImageUploaderClient />
    {/* <Powered /> */}
    <StepsSection />
    <BentoGrid />
    <InfoLanding />
    <Features />
    <Testimonials />
    <CTA />
  </>;
}

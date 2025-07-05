import { unstable_setRequestLocale } from "next-intl/server";

import BentoGrid from "@/components/sections/bentogrid";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import StepsSection from "@/components/sections/steps";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/CTA";
import VideoSection from "@/components/sections/video-section";
import DemoList from "@/components/sections/test-demo";
import TryOnClothing from "@/components/try-on-clothing";
import { PricingCards } from "@/components/pricing/pricing-cards";

export default function IndexPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <HeroLanding />
      {/* <PreviewLanding /> */}
      <Features />

      <TryOnClothing />

      <VideoSection />
      {/* <Powered /> */}
      <StepsSection />
      {/* <BentoGrid /> */}
      <DemoList />
      {/* <InfoLanding/> */}
      {/* <Testimonials /> */}
      <PricingCards />
      <div className="my-8 flex justify-center">
        <a href="https://magicbox.tools" target="_blank" className="transition-transform hover:scale-105">
          <img src="https://magicbox.tools/badge.svg" alt="Featured on MagicBox.tools" width="200" height="54" className="rounded-lg shadow-md" />
        </a>
      </div>
      <CTA />
    </div>
  );
}

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
    <>
      <HeroLanding />
      {/* <PreviewLanding /> */}
      <TryOnClothing />

      <VideoSection />
      {/* <Powered /> */}
      <StepsSection />
      {/* <BentoGrid /> */}
      <DemoList />
      {/* <InfoLanding/> */}
      <Features />
      {/* <Testimonials /> */}
      <PricingCards />
      <div className="flex justify-center my-4">
        <a href="https://magicbox.tools" target="_blank">
          <img src="https://magicbox.tools/badge.svg" alt="Featured on MagicBox.tools" width="200" height="54" />
        </a>
      </div>
      <CTA />
    </>
  );
}

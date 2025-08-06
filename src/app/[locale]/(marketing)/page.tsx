import { unstable_setRequestLocale } from "next-intl/server";

import GeminiStorybookHero from "@/components/sections/gemini-storybook-hero";
import GeminiFeatures from "@/components/sections/gemini-features";
import GeminiShowcase from "@/components/sections/gemini-showcase";
import GeminiCTA from "@/components/sections/gemini-cta";

export default function IndexPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <GeminiStorybookHero />
      <GeminiFeatures />
      <GeminiShowcase />
      <GeminiCTA />
    </div>
  );
}

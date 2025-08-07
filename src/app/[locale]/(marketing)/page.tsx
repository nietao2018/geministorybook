import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import GeminiStorybookHero from "@/components/sections/gemini-storybook-hero";
import GeminiFeatures from "@/components/sections/gemini-features";
import GeminiShowcase from "@/components/sections/gemini-showcase";
import GeminiCTA from "@/components/sections/gemini-cta";

export const metadata: Metadata = {
  title: "Gemini Storybook - AI-Powered Zodiac Stories | geministorybook.life",
  description: "Create your personal gemini storybook with AI-powered zodiac storytelling. Explore personalized Gemini stories that reflect your dual nature and zodiac traits.",
  keywords: ["gemini storybook", "Gemini Storybook", "gemini storybook AI", "AI gemini storybook", "personal gemini storybook", "gemini storybook creator", "gemini storybook generator", "create gemini storybook", "my gemini storybook", "gemini zodiac stories", "gemini story generator", "zodiac storytelling", "astrology narratives"],
  openGraph: {
    title: "Gemini Storybook - AI-Powered Zodiac Stories",
    description: "Create your personal gemini storybook with AI-powered zodiac storytelling. Explore personalized Gemini stories that reflect your dual nature.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gemini Storybook - AI-Powered Zodiac Stories",
    description: "Create your personal gemini storybook with AI-powered zodiac storytelling.",
  },
  alternates: {
    canonical: "https://geministorybook.life",
  },
};

export default function IndexPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Gemini Storybook",
    "description": "AI-powered gemini storybook platform for creating personalized zodiac stories that explore Gemini traits and dual nature",
    "url": "https://geministorybook.life",
    "applicationCategory": "Entertainment",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "geministorybook.life"
    },
    "keywords": "gemini storybook, AI storytelling, zodiac stories, Gemini traits, dual personality, astrology narratives"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen">
        <GeminiStorybookHero />
        <GeminiFeatures />
        <GeminiShowcase />
        <GeminiCTA />
      </div>
    </>
  );
}

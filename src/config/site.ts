import { SidebarNavItem, SiteConfig } from "@/types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  title: "Gemini Storybook | geministorybook.info",
  name: "geministorybook.info",
  description: 
    "Explore the mystical world of Gemini with geministorybook.info. Our AI-powered platform helps you create personalized zodiac stories that reflect your unique Gemini traits. Discover your stellar legend through the art of storytelling.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/ullr_ai",
    github: "https://github.com/ullrai/geministorybook.info",
    discord: "https://discord.gg/8SpXRTBRfD"
  },
  mailSupport: "support@geministorybook.info",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "geministorybook.info",
    "url": site_url,
    "description": "Explore the mystical world of Gemini with geministorybook.info. Our AI-powered platform helps you create personalized zodiac stories that reflect your unique Gemini traits. Discover your stellar legend through the art of storytelling.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${site_url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  },
  keywords: [
    "AI storytelling",
    "Gemini zodiac",
    "personalized stories",
    "astrology narratives",
    "dual personality exploration",
    "zodiac storytelling",
    "AI story generator",
    "Gemini traits",
    "celestial stories",
    "astrology AI",
    "personality stories",
    "Gemini characteristics"
  ],
  authors: [
    {
      name: "UllrAI",
    },
  ],
  creator: "UllrAI",
  twitterCreator: "@UllrAI",
  icons: "/favicon.ico",
  manifest: `${site_url}/site.webmanifest`,
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
      { title: "Refund", href: "/refund" },
    ],
  },
];

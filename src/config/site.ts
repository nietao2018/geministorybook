import { SidebarNavItem, SiteConfig } from "@/types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  title: "Gemini Storybook - AI-Powered Zodiac Stories | geministorybook.life",
  name: "geministorybook.life",
  description: 
    "Gemini Storybook - Create personalized AI-generated stories that explore your unique Gemini traits and dual nature. Our gemini storybook platform helps you discover your stellar legend through zodiac storytelling and astrology narratives.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/ullr_ai",
    github: "https://github.com/ullrai/geministorybook.life",
    discord: "https://discord.gg/8SpXRTBRfD"
  },
  mailSupport: "support@geministorybook.life",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "geministorybook.life",
    "url": site_url,
    "description": "Gemini Storybook - Create personalized AI-generated stories that explore your unique Gemini traits and dual nature. Our gemini storybook platform helps you discover your stellar legend through zodiac storytelling and astrology narratives.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${site_url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  },
  keywords: [
    "gemini storybook",
    "Gemini Storybook",
    "gemini storybook AI",
    "AI gemini storybook",
    "gemini zodiac stories",
    "gemini story generator",
    "gemini personality stories",
    "AI storytelling",
    "zodiac storytelling",
    "astrology narratives",
    "dual personality exploration",
    "Gemini traits",
    "personalized zodiac stories",
    "celestial storytelling",
    "astrology AI stories"
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

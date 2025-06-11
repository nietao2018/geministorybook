import { SidebarNavItem, SiteConfig } from "@/types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  title: "AI Marketing Video Generator | Converters.pro",
  name: "Converters.pro",
  description: 
    "Create stunning marketing videos with Converters.pro. Our AI-powered video generator helps you craft engaging social media content, product demos, and brand videos in minutes. Transform your marketing with professional, customizable video content.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/ullr_ai",
    github: "https://github.com/ullrai/HeadShots.fun",
  },
  mailSupport: "support@headshots.fun",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Converters.pro",
    "url": site_url,
    "description": "Create stunning marketing videos with Converters.pro. Our AI-powered video generator helps you craft engaging social media content, product demos, and brand videos in minutes. Transform your marketing with professional, customizable video content.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${site_url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  },
  keywords: [
    "AI video generator",
    "marketing videos",
    "video marketing",
    "AI marketing",
    "social media videos",
    "brand videos",
    "product demos",
    "video creation tool",
    "AI video editing",
    "promotional videos",
    "content marketing",
    "digital marketing"
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
  {
    title: "Ullr AI Products",
    items: [
      { title: "PixMiller", href: "https://pixmiller.com" },
      { title: "HeadShots fun", href: "https://headshot.cv" },
      { title: "Ullr AI Lab", href: "https://ullrai.com" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Pricing", href: "/pricing" },
      // { title: "Styles", href: "/generator-styles" },
      // { title: "Blog", href: "/blog" },
    ],
  },
];

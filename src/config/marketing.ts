import { MarketingConfig } from "@/types";

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "blog",
      href: "/blog",
    },
    {
      title: "image-converter",
      href: "#",
      children: [
        {
          title: "remove-bg",
          href: "/remove-bg",
          icon: "scissors",
        },
        {
          title: "image-restoration",
          href: "/image-restoration",
          icon: "refresh",
        },
        {
          title: "photo-real-style",
          href: "/photo-real-style",
          icon: "palette",
        },
        {
          title: "clothes-try-on",
          href: "/try-on-clothing",
          icon: "shirt",
        },
        {
          title: "image-resize",
          href: "/image-resize",
          icon: "maximize",
        },
        {
          title: "image-compressor",
          href: "/image-compressor",
          icon: "archive",
        },
        {
          title: "kontext-komposer",
          href: "/kontext-komposer",
          icon: "edit",
        },
      ],
    },
    {
      title: "video-converter",
      href: "#",
      children: [
        {
          title: "video-bg-removal",
          href: "/video-bg-removal",
          icon: "film",
        },
        {
          title: "video-enhancement",
          href: "/video-enhancement",
          icon: "maximize",
        },
        {
          title: "earth-zoom-out",
          href: "/earth-zoom-out",
          icon: "globe",
        },
      ],
    },
    {
      title: "audio-converter",
      href: "#",
      children: [
        {
          title: "voice-enhancement",
          href: "/voice-enhancement",
          icon: "mic",
        },
        {
          title: "audio-transcription",
          href: "/audio-transcription",
          icon: "type",
        },
        {
          title: "text-to-speech",
          href: "/text-to-speech",
          icon: "volume2",
        },
      ],
    },
    {
      title: "pricing",
      href: "/pricing",
    },
  ],
}
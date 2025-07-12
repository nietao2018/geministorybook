interface InfoLdg {
  title: string;
  description: string;
  image: string;
  list: Array<{ title: string; description: string; icon: string }>;
}

interface FeatureLdg {
  title: string;
  description: string;
  link: string;
  icon: string;
}

interface TestimonialType {
  name: string;
  job: string;
  image: string;
  review: string;
}

export const infos: InfoLdg[] = [
  {
    title: "Empower Your Creativity",
    description:
      "Unlock the fun and potential of your headshots with Converters.pro. Transform simple snapshots into captivating AI-enhanced images that reflect your true self.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Create Effortlessly",
        description: "Enjoy a seamless and intuitive process that makes creating the perfect headshot a breeze.",
        icon: "laptop",
      },
      {
        title: "Personalize with AI",
        description: "Use advanced AI tools to customize every aspect of your headshot, ensuring it’s uniquely you.",
        icon: "settings",
      },
      {
        title: "Elevate Your Presence",
        description: "Whether for work or play, make sure your online presence stands out with headshots that combine fun with professionalism.",
        icon: "search",
      },
    ],
  }
];

interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: FeatureLdg[];
}

// Helper function to add new feature categories
export function addFeatureCategory(category: FeatureCategory): void {
  featureCategories.push(category);
}

// Helper function to add feature to existing category
export function addFeatureToCategory(categoryId: string, feature: FeatureLdg): boolean {
  const category = featureCategories.find(cat => cat.id === categoryId);
  if (category) {
    category.features.push(feature);
    return true;
  }
  return false;
}

// Helper function to get category by id
export function getCategoryById(categoryId: string): FeatureCategory | undefined {
  return featureCategories.find(cat => cat.id === categoryId);
}

// Helper function to get all category IDs
export function getCategoryIds(): string[] {
  return featureCategories.map(cat => cat.id);
}

export const featureCategories: FeatureCategory[] = [
  {
    id: "image-converter",
    title: "Image Converter",
    description: "Transform and enhance images with AI-powered tools",
    icon: "image",
    features: [
      {
        title: "Background Removal",
        description: "Remove backgrounds from images instantly with AI precision. Perfect for creating professional headshots and product photos.",
        link: "/remove-bg",
        icon: "scissors",
      },
      {
        title: "Image Restoration",
        description: "Restore old or damaged photos with advanced AI algorithms. Bring your memories back to life with stunning clarity.",
        link: "/image-restoration",
        icon: "refresh",
      },
      {
        title: "Photo Real Style",
        description: "Convert your photos into different artistic styles while maintaining photorealistic quality.",
        link: "/photo-real-style",
        icon: "palette",
      },
      {
        title: "Try-On Clothing",
        description: "Virtually try on different clothing items using AI. See how outfits look before you buy.",
        link: "/try-on-clothing",
        icon: "shirt",
      },
      {
        title: "Image Resize",
        description: "The Image Resize feature helps users quickly adjust image dimensions, supporting various ratios and formats, making it convenient for web, social media, and diverse visual design scenarios.",
        link: "/image-resize",
        icon: "maximize",
      },
      {
        title: "Image Compressor",
        description: "Compress images with advanced AI technology while maintaining quality. Reduce file sizes significantly for JPG, PNG, WebP formats.",
        link: "/image-compressor",
        icon: "archive",
      },
      {
        title: "Kontext Komposer",
        description: "Revolutionary FLUX.1 Kontext Komposer for intelligent image editing. Simply tell our AI what to change - no complex tools needed. Context-aware editing, character consistency, and multimodal composition.",
        link: "/kontext-komposer",
        icon: "edit",
      },
    ],
  },
  {
    id: "video-converter",
    title: "Video Converter",
    description: "Process and transform video content with AI",
    icon: "video",
    features: [
      {
        title: "Video Background Removal",
        description: "Remove or replace video backgrounds in real-time. Perfect for creating professional video content.",
        link: "/video-bg-removal",
        icon: "film",
      },
      {
        title: "Video Enhancement",
        description: "Enhance video quality with AI upscaling and noise reduction. Make your videos look professional.",
        link: "/video-enhancement",
        icon: "maximize",
      },
      {
        title: "Earth Zoom Out",
        description: "Transform any image into stunning Earth zoom out animation. Smooth zoom from surface close-up to space perspective, creating cinematic visual effects.",
        link: "/earth-zoom-out",
        icon: "globe",
      },
    ],
  },
  {
    id: "audio-converter",
    title: "Audio Converter",
    description: "Transform and enhance audio files with AI",
    icon: "headphones",
    features: [
      {
        title: "Voice Enhancement",
        description: "Improve audio quality and remove background noise from voice recordings.",
        link: "/voice-enhancement",
        icon: "mic",
      },
      {
        title: "Audio Transcription",
        description: "Convert speech to text with high accuracy. Perfect for creating subtitles and documentation.",
        link: "/audio-transcription",
        icon: "type",
      },
      {
        title: "Text to Speech",
        description: "Convert text to natural-sounding speech with AI voices. Support multiple languages and voice styles.",
        link: "/text-to-speech",
        icon: "volume2",
      },
    ],
  },
];

// Example of how to add a new category (commented out)
// addFeatureCategory({
//   id: "text-converter",
//   title: "Text Converter",
//   description: "Transform and analyze text content with AI",
//   icon: "type",
//   features: [
//     {
//       title: "Text Translation",
//       description: "Translate text between multiple languages with high accuracy.",
//       link: "/text-translation",
//       icon: "globe",
//     },
//     {
//       title: "Text Summarization",
//       description: "Generate concise summaries of long text documents.",
//       link: "/text-summarization",
//       icon: "file-text",
//     },
//   ],
// });

// Legacy features for backward compatibility
export const features: FeatureLdg[] = featureCategories.flatMap(category => category.features);

export const testimonials: TestimonialType[] = [
  {
    name: "Sarah Green",
    job: "Portrait Photographer",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    review:
    "HeadShots.fun has completely transformed my workflow. The AI tools are not only efficient but also fun to use, making the headshot creation process both professional and enjoyable.",
  },
  {
    name: "Laura Bennett",
    job: "Digital Marketing Specialist",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    review:
      "HeadShots.fun made it super easy to create professional headshots for all my social media campaigns. ",
  },
  {
    name: "Michael Carter",
    job: "Brand Strategist",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    review:
      "HeadShots.fun has significantly enhanced my brand work by providing professional-quality images that perfectly align with my brand's style.",
  },
  {
    name: "Olivia Turner",
    job: "Startup Founder",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    review:
      "Creating headshots for my startup has never been this easy and enjoyable. Converters.pro delivers fantastic results while keeping the process light and fun.",
  },
  {
    name: "David Harris",
    job: "Creative Director",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    review:
      "I love how Converters.pro balances creativity and professionalism. The flexibility of the AI tools allows me to design headshots that are both fun and perfectly suited to my creative projects.",
  },
  {
    name: "Chris Wilson",
    job: "Full-Stack Developer",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    review:
      "The efficiency and quality of Converters.pro are outstanding. I was able to create studio-quality headshots in minutes, and the process was surprisingly enjoyable.",
  },
  {
    name: "Emma Collins",
    job: "Marketing Coordinator",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    review:
      "HeadShots.fun has been a valuable tool for our marketing campaigns. The AI-generated headshots are not only professional but also have a unique, fun element that makes our profiles stand out.",
  },
  {
    name: "John Doe",
    job: "CEO",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    review:
      "The quality and speed of Converters.pro are impressive. I was able to create a professional headshot that looks like it was done in a studio, all within minutes.",
  },
];

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import Image from "next/image";

export default function GeminiShowcase() {
  const t = useTranslations('GeminiStorybook');
  
  const storyExamples = [
    {
      title: t('showcase.story1_title'),
      excerpt: t('showcase.story1_excerpt'),
      mood: t('showcase.story1_mood'),
      color: "blue",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      image: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/story1.png",
      link: "https://gemini.google.com/share/ba2ca1d1ea16"
    },
    {
      title: t('showcase.story2_title'),
      excerpt: t('showcase.story2_excerpt'),
      mood: t('showcase.story2_mood'),
      color: "purple", 
      gradient: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/30",
      image: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/story2.png",
      link: "https://gemini.google.com/share/c29516e1956f"
    },
    {
      title: t('showcase.story3_title'),
      excerpt: t('showcase.story3_excerpt'),
      mood: t('showcase.story3_mood'),
      color: "cyan",
      gradient: "from-cyan-500/20 to-teal-500/20", 
      border: "border-cyan-500/30",
      image: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/story3.png",
      link: "https://gemini.google.com/share/d50991541f20"
    },
    {
      title: t('showcase.story4_title'),
      excerpt: t('showcase.story4_excerpt'),
      mood: t('showcase.story4_mood'),
      color: "emerald",
      gradient: "from-emerald-500/20 to-green-500/20",
      border: "border-emerald-500/30",
      image: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/story4.png",
      link: "https://gemini.google.com/share/4ab78819ca20"
    },
    {
      title: t('showcase.story5_title'),
      excerpt: t('showcase.story5_excerpt'),
      mood: t('showcase.story5_mood'),
      color: "rose",
      gradient: "from-rose-500/20 to-pink-500/20",
      border: "border-rose-500/30",
      image: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/story5.png",
      link: "https://gemini.google.com/share/15d96466c9ad"
    },
    {
      title: t('showcase.story6_title'),
      excerpt: t('showcase.story6_excerpt'),
      mood: t('showcase.story6_mood'),
      color: "amber",
      gradient: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/30",
      image: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/story6.png",
      link: "https://gemini.google.com/share/5868ef9fdc47"
    }
  ];

  const zodiacTraits = [
    { trait: t('showcase.trait_communication'), icon: "💬" },
    { trait: t('showcase.trait_quick_thinking'), icon: "⚡" },
    { trait: t('showcase.trait_adaptable'), icon: "🔄" },
    { trait: t('showcase.trait_curious'), icon: "🔍" },
    { trait: t('showcase.trait_dual_nature'), icon: "🎭" },
    { trait: t('showcase.trait_innovative'), icon: "💡" }
  ];
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800 py-24">
      {/* Background stars */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-10 size-1 animate-pulse rounded-full bg-blue-400 opacity-60" />
        <div className="absolute right-1/3 top-20 size-2 animate-pulse rounded-full bg-cyan-300 opacity-40" style={{animationDelay: '1s'}} />
        <div className="absolute left-1/2 top-32 size-1 animate-pulse rounded-full bg-purple-400 opacity-80" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-40 right-1/4 size-2 animate-pulse rounded-full bg-indigo-300 opacity-50" style={{animationDelay: '3s'}} />
      </div>
      
      <div className="container relative px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            {t('showcase.title')}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {t('showcase.title_highlight')}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-300">
            {t('showcase.subtitle')}
          </p>
        </div>

        {/* Story Examples */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {storyExamples.map((story, index) => (
            <Link
              key={index}
              href={story.link}
              className={cn(
                "group relative block cursor-pointer overflow-hidden rounded-3xl border bg-gray-800/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-4 hover:bg-gray-800/60 hover:shadow-2xl",
                story.border
              )}
            >
              {/* Story Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                
                {/* Mood tag */}
                <div className={cn(
                  "absolute left-4 top-4 inline-block rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm",
                  story.color === "blue" && "border border-blue-400/30 bg-blue-500/30 text-blue-200",
                  story.color === "purple" && "border border-purple-400/30 bg-purple-500/30 text-purple-200", 
                  story.color === "cyan" && "border border-cyan-400/30 bg-cyan-500/30 text-cyan-200",
                  story.color === "emerald" && "border border-emerald-400/30 bg-emerald-500/30 text-emerald-200",
                  story.color === "rose" && "border border-rose-400/30 bg-rose-500/30 text-rose-200",
                  story.color === "amber" && "border border-amber-400/30 bg-amber-500/30 text-amber-200"
                )}>
                  {story.mood}
                </div>

                {/* Gemini symbol */}
                <div className="absolute right-4 top-4">
                  <div className="text-3xl opacity-60 transition-opacity duration-300 group-hover:opacity-100">♊</div>
                </div>
              </div>

              {/* Gradient background */}
              <div className={cn(
                "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                story.gradient
              )} />
              
              <div className="relative z-10 p-6">
                {/* Read more */}
                <div className="flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors group-hover:text-cyan-300">
                  {t('showcase.read_full_story')}
                  <Icons.arrowRight className="size-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className={cn(
                "absolute -inset-1 -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100",
                story.color === "blue" && "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
                story.color === "purple" && "bg-gradient-to-r from-purple-500/20 to-indigo-500/20", 
                story.color === "cyan" && "bg-gradient-to-r from-cyan-500/20 to-teal-500/20",
                story.color === "emerald" && "bg-gradient-to-r from-emerald-500/20 to-green-500/20",
                story.color === "rose" && "bg-gradient-to-r from-rose-500/20 to-pink-500/20",
                story.color === "amber" && "bg-gradient-to-r from-amber-500/20 to-orange-500/20"
              )} />
            </Link>
          ))}
        </div>

        {/* Zodiac Traits */}
        <div className="rounded-3xl border border-gray-700/50 bg-gray-800/30 p-8 backdrop-blur-sm md:p-12">
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">{t('showcase.zodiac_traits')}</h3>
            <p className="text-gray-300">
              {t('showcase.traits_description')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {zodiacTraits.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col items-center rounded-xl border border-gray-700/30 bg-gray-800/50 p-4 text-center transition-all duration-300 hover:border-cyan-500/50 hover:bg-gray-800/70"
              >
                <div className="mb-2 text-2xl">{item.icon}</div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                  {item.trait}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-10 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
            <span>{t('showcase.create_my_story')}</span>
            <Icons.arrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </section>
  );
}
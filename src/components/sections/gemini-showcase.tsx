import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { useTranslations } from 'next-intl';

export default function GeminiShowcase() {
  const t = useTranslations('GeminiStorybook');
  
  const storyExamples = [
    {
      title: t('showcase.story1_title'),
      excerpt: t('showcase.story1_excerpt'),
      mood: t('showcase.story1_mood'),
      color: "blue",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30"
    },
    {
      title: t('showcase.story2_title'),
      excerpt: t('showcase.story2_excerpt'),
      mood: t('showcase.story2_mood'),
      color: "purple", 
      gradient: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/30"
    },
    {
      title: t('showcase.story3_title'),
      excerpt: t('showcase.story3_excerpt'),
      mood: t('showcase.story3_mood'),
      color: "cyan",
      gradient: "from-cyan-500/20 to-teal-500/20", 
      border: "border-cyan-500/30"
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
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {storyExamples.map((story, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-gray-800/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:bg-gray-800/60",
                story.border
              )}
            >
              {/* Gradient background */}
              <div className={cn(
                "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                story.gradient
              )} />
              
              <div className="relative z-10">
                {/* Mood tag */}
                <div className={cn(
                  "mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium",
                  story.color === "blue" && "bg-blue-500/20 text-blue-300",
                  story.color === "purple" && "bg-purple-500/20 text-purple-300", 
                  story.color === "cyan" && "bg-cyan-500/20 text-cyan-300"
                )}>
                  {story.mood}
                </div>
                
                {/* Title */}
                <h3 className="mb-4 text-xl font-semibold text-white">
                  {story.title}
                </h3>
                
                {/* Excerpt */}
                <p className="mb-6 leading-relaxed text-gray-300">
                  {story.excerpt}
                </p>
                
                {/* Read more */}
                <button className="group/btn flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300">
                  {t('showcase.read_full_story')}
                  <Icons.arrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute right-4 top-4">
                <div className="text-2xl opacity-40">♊</div>
              </div>
            </div>
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
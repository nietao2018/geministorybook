import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { useTranslations } from 'next-intl';

export default function GeminiFeatures() {
  const t = useTranslations('GeminiStorybook');
  
  const features = [
    {
      icon: "🌙",
      title: t('features.dual_personality'),
      description: t('features.dual_personality_desc'),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "💭",
      title: t('features.wisdom_dialogue'),
      description: t('features.wisdom_dialogue_desc'),
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: "🔄",
      title: t('features.change_themes'),
      description: t('features.change_themes_desc'),
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      icon: "🎭",
      title: t('features.multi_role'),
      description: t('features.multi_role_desc'),
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: "🌟",
      title: t('features.zodiac_fortune'),
      description: t('features.zodiac_fortune_desc'),
      gradient: "from-teal-500 to-blue-500"
    },
    {
      icon: "📚",
      title: t('features.knowledge_quest'),
      description: t('features.knowledge_quest_desc'),
      gradient: "from-purple-500 to-pink-500"
    }
  ];
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-20 size-40 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" />
        <div className="absolute -right-10 bottom-20 size-60 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-3xl" />
      </div>
      
      <div className="container relative px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {t('features.title')}
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/30 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-gray-600/50 hover:bg-gray-800/50",
                index % 2 === 0 ? "hover:shadow-blue-500/10" : "hover:shadow-purple-500/10"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient background on hover */}
              <div className={cn(
                "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-5",
                feature.gradient
              )} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 text-5xl">{feature.icon}</div>
                
                {/* Title */}
                <h3 className="mb-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="leading-relaxed text-gray-400">
                  {feature.description}
                </p>
                
                {/* Decorative line */}
                <div className={cn(
                  "mt-6 h-1 w-12 rounded-full bg-gradient-to-r transition-all duration-500 group-hover:w-20",
                  feature.gradient
                )} />
              </div>
              
              {/* Floating particles */}
              <div className="absolute right-4 top-4 size-2 animate-pulse rounded-full bg-blue-400 opacity-40" />
              <div className="absolute bottom-6 left-6 size-1 animate-pulse rounded-full bg-purple-400 opacity-60" style={{animationDelay: '1s'}} />
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="group relative inline-flex items-center gap-3 rounded-xl border border-cyan-500/50 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-8 py-3 text-lg font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:from-blue-500/20 hover:to-cyan-500/20">
            <span>{t('features.explore_more')}</span>
            <Icons.arrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
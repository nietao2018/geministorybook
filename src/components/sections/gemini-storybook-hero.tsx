import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { useTranslations } from 'next-intl';

export default function GeminiStorybookHero() {
  const t = useTranslations('GeminiStorybook');
  
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gemini constellation pattern */}
        <div className="absolute left-1/4 top-1/4 size-2 animate-pulse rounded-full bg-blue-400 opacity-80" />
        <div className="top-1/5 absolute left-1/3 size-1 animate-pulse rounded-full bg-cyan-300 opacity-60" style={{animationDelay: '0.5s'}} />
        <div className="top-1/6 absolute left-1/2 size-3 animate-pulse rounded-full bg-indigo-400 opacity-70" style={{animationDelay: '1s'}} />
        <div className="absolute right-1/3 top-1/4 size-2 animate-pulse rounded-full bg-purple-400 opacity-60" style={{animationDelay: '1.5s'}} />
        <div className="top-1/5 absolute right-1/4 size-1 animate-pulse rounded-full bg-blue-300 opacity-80" style={{animationDelay: '2s'}} />
        
        {/* Floating orbs */}
        <div className="absolute left-20 top-32 size-32 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl" />
        <div className="absolute right-20 top-40 size-40 animate-pulse rounded-full bg-gradient-to-r from-purple-500/15 to-indigo-500/15 blur-2xl" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-32 size-24 animate-pulse rounded-full bg-gradient-to-r from-cyan-500/25 to-blue-500/25 blur-lg" style={{animationDelay: '2s'}} />
      </div>
      
      <div className="container relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Gemini Symbol */}
        <div className="relative mb-8">
          <div className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-8xl font-bold text-transparent">
            ♊
          </div>
          <div className="absolute -inset-2 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg" />
        </div>

        {/* Main Title */}
        <div className="mb-8 space-y-4">
          <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="block">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Gemini
              </span>
            </span>
            <span className="block text-4xl font-light text-gray-200 sm:text-5xl md:text-6xl lg:text-7xl">
              Storybook
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mb-12 max-w-4xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
          {t('subtitle')}
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {t('description')}
          </span>
        </p>

        {/* Feature highlights */}
        <div className="mb-12 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <div className="group rounded-xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50 hover:bg-gray-800/50">
            <div className="mb-3 text-3xl">✨</div>
            <h3 className="mb-2 text-lg font-semibold text-white">{t('hero.ai_story_generation')}</h3>
            <p className="text-sm text-gray-400">{t('hero.ai_story_description')}</p>
          </div>
          <div className="group rounded-xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 hover:bg-gray-800/50">
            <div className="mb-3 text-3xl">🌟</div>
            <h3 className="mb-2 text-lg font-semibold text-white">{t('hero.zodiac_matching')}</h3>
            <p className="text-sm text-gray-400">{t('hero.zodiac_description')}</p>
          </div>
          <div className="group rounded-xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-gray-800/50">
            <div className="mb-3 text-3xl">🎨</div>
            <h3 className="mb-2 text-lg font-semibold text-white">{t('hero.visual_presentation')}</h3>
            <p className="text-sm text-gray-400">{t('hero.visual_description')}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/create-story"
            className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-blue-500/25"
          >
            <span className="relative z-10">{t('start_creating')}</span>
            <Icons.arrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          
          <Link
            href="/explore"
            className="group inline-flex items-center gap-3 rounded-2xl border border-gray-600/50 bg-gray-800/50 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-gray-800/70"
          >
            <span>{t('explore_gallery')}</span>
            <Icons.arrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex animate-bounce flex-col items-center text-gray-400">
            <span className="mb-2 text-xs">{t('hero.scroll_down')}</span>
            <Icons.arrowDown className="size-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
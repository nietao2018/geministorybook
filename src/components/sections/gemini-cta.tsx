import Link from "next/link";
import { Icons } from "@/components/shared/icons";
import { useTranslations } from 'next-intl';

export default function GeminiCTA() {
  const t = useTranslations('GeminiStorybook');
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Constellation lines */}
        <svg className="absolute inset-0 size-full opacity-20" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {/* Gemini constellation pattern */}
          <path 
            d="M200,150 L300,200 L400,150 M200,150 L250,300 M400,150 L350,300 M250,300 L350,300" 
            stroke="url(#constellation)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M800,250 L900,300 L1000,250 M800,250 L850,400 M1000,250 L950,400 M850,400 L950,400" 
            stroke="url(#constellation)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{animationDelay: '1s'}}
          />
        </svg>
        
        {/* Floating particles */}
        <div className="absolute left-20 top-20 size-32 animate-pulse rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-2xl" />
        <div className="absolute bottom-20 right-20 size-40 animate-pulse rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-3xl" style={{animationDelay: '2s'}} />
      </div>
      
      <div className="container relative px-4 text-center">
        {/* Gemini symbol */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-6xl text-transparent">
              ♊
            </div>
            <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
          </div>
        </div>
        
        {/* Main content */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {t('cta.title')}
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {t('cta.title_highlight')}
            </span>
          </h2>
          
          <p className="mb-12 text-xl text-gray-300 sm:text-2xl">
            {t('cta.description')}
            <br />
            {t('cta.description2')}
          </p>
          
          {/* Feature highlights */}
          <div className="mb-12 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-4 backdrop-blur-sm">
              <div className="mb-2 text-2xl">🚀</div>
              <div className="text-sm font-medium text-gray-300">{t('cta.feature1')}</div>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-4 backdrop-blur-sm">
              <div className="mb-2 text-2xl">✨</div>
              <div className="text-sm font-medium text-gray-300">{t('cta.feature2')}</div>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-4 backdrop-blur-sm">
              <div className="mb-2 text-2xl">🌟</div>
              <div className="text-sm font-medium text-gray-300">{t('cta.feature3')}</div>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
          <Link
            href="/create-story"
            className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-10 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
          >
            <span className="relative z-10">{t('cta.start_creating')}</span>
            <Icons.arrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-1" />
            
            {/* Hover effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <div className="absolute inset-0 translate-x-[-200%] -skew-x-12 animate-[shimmer_2s_ease-out] rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </Link>
          
          <Link
            href="/gallery"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-gray-600/50 bg-gray-800/50 px-10 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-gray-800/70"
          >
            <span>{t('cta.browse_gallery')}</span>
            <Icons.arrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Bottom text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            {t('cta.bottom_text')}
          </p>
          <div className="mt-4 flex justify-center gap-8 text-xs text-gray-500">
            <span>✨ {t('cta.free_start')}</span>
            <span>🔒 {t('cta.privacy_protected')}</span>
            <span>🎨 {t('cta.unlimited_creation')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { RainbowButton } from "@/components/ui/rainbow-button";

import { useTranslations } from 'next-intl';

export default function HeroLanding() {
  const t = useTranslations('HeroLanding');
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-80 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl" />
      </div>
      
      <div className="container relative flex max-w-6xl flex-col items-center gap-8 text-center">
        {/* Announcement Badge */}
        <Link
          href="https://www.converters.pro/pricing"
          className={cn(
            "group inline-flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/80 px-6 py-3 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80",
          )}
          target="_blank"
        >
          <span className="text-2xl group-hover:animate-bounce">🚀</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent">
            Converters.pro is 50% OFF - Limited Time Offer!
          </span>
        </Link>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block text-gray-900 dark:text-white">
              {t("fun_pro_for_every_occasion")}
            </span>
            <span className="mt-2 block">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("headshots_fun")}
              </span>
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className="max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 sm:text-2xl">
          {t.rich('get_unique_portraits', {
            bold: (chunks) => <strong className="text-gray-900 dark:text-white">{chunks}</strong>
          })}
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            href="/try-on-clothing"
            prefetch={true}
            className="group"
          >
            <div className="hover:shadow-3xl relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              <span className="relative z-10">{t("get_your_headshots")}</span>
              <Icons.arrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-1" />
              
              {/* Animated background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </Link>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute left-10 top-20 size-4 animate-pulse rounded-full bg-blue-400 opacity-60" />
        <div className="absolute right-20 top-40 size-3 animate-pulse rounded-full bg-purple-400 opacity-40" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-32 left-20 size-2 animate-pulse rounded-full bg-pink-400 opacity-50" style={{animationDelay: '2s'}} />
      </div>
    </section>
  );
}

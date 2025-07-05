import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { useTranslations } from "next-intl";

const featuresIcons = [
  { icon: "sliders", link: "/image-restoration" },
  { icon: "zap", link: "/try-on-clothing" },
  { icon: "share2", link: "/photo-real-style" },
  { icon: "shield", link: "/remove-bg" },
  { icon: "cpu", link: "/" },
  { icon: "smile", link: "/" },
];

export default function Features() {
  const t = useTranslations("Features");
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-gray-800/30" />
      
      <div className="relative">
        <MaxWidthWrapper>
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-medium text-gray-700 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-gray-300">
              <span className="size-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              Features
            </div>
            <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuresIcons.map((item, index) => {
              const Icon = Icons[item.icon || "nextjs"];
              const featureNumber = (index + 1).toString();
              return (
                <Link
                  href={item.link}
                  key={t(`features.${featureNumber}.title`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`features.${featureNumber}.title`)}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-gray-600/50 dark:bg-gray-800/80"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-8" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      {t(`features.${featureNumber}.title`)}
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {t(`features.${featureNumber}.description`)}
                    </p>
                    
                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400">
                      <span className="text-sm font-medium">Learn more</span>
                      <Icons.arrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}

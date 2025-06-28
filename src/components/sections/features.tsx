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
    <section>
      <div className="pb-6 pt-28">
        <MaxWidthWrapper>
          <HeaderSection
            label="Features"
            title={t("title")}
            subtitle={t("subtitle")}
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                  className="group relative overflow-hidden rounded-2xl border bg-background p-5 transition-transform hover:scale-105 hover:shadow-lg md:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-purple-500/80 to-white opacity-25 blur-2xl duration-300 group-hover:-translate-y-1/4 dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10"
                  />
                  <div className="relative">
                    <div className="relative flex size-12 rounded-2xl border border-border shadow-sm *:relative *:m-auto *:size-6">
                      <Icon />
                    </div>
                    <h3 className="mt-4 font-semibold">
                      {t(`features.${featureNumber}.title`)}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {t(`features.${featureNumber}.description`)}
                    </p>
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

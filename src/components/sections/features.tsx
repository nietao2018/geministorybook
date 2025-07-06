import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { useTranslations } from "next-intl";
import { featureCategories } from "@/config/landing";

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

function FeatureCard({ title, description, link, icon }: FeatureCardProps) {
  const Icon = Icons[icon] || Icons.nextjs;
  
  return (
    <Link
      href={link}
      className="group relative flex h-64 flex-col overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative flex h-full flex-col">
        <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Icon className="size-6" />
        </div>
        
        <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h4>
        
        <p className="mb-4 line-clamp-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {description}
        </p>
        
        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400">
          <span className="text-xs font-medium">Learn more</span>
          <Icons.arrowRight className="ml-1 size-3 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

interface FeatureCategoryProps {
  category: {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: FeatureCardProps[];
  };
}

function FeatureCategory({ category }: FeatureCategoryProps) {
  const Icon = Icons[category.icon] || Icons.nextjs;
  
  return (
    <div className="mb-16">
      <div className="mb-8 flex items-center gap-4">
        <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
          <Icon className="size-8" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {category.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {category.description}
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.features.map((feature, index) => (
          <FeatureCard
            key={`${category.id}-${index}`}
            title={feature.title}
            description={feature.description}
            link={feature.link}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  const t = useTranslations("Features");
  
  return (
    <section className="relative overflow-hidden py-20">
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

          <div className="space-y-20">
            {featureCategories.map((category) => (
              <FeatureCategory key={category.id} category={category} />
            ))}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}

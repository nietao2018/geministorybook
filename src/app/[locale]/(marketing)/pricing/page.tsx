import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { ComparisonTable } from "@/components/pricing/comparison-table";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('PricingPage');

  return constructMetadata({
    title: t('metadata.title', { siteTitle: siteConfig.title }),
    description: t('metadata.description'),
  });
}

export default async function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <MaxWidthWrapper>
        <section className="flex flex-col items-center">
          <PricingCards  />
          {/* <ComparisonTable pricingData={pricingData} locale={locale} /> */}
          <hr className="container" />
          <div className="mt-16 flex w-full flex-col items-center gap-2">
            <PricingFaq locale={locale} />
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}

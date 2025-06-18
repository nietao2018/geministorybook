"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeaderSection } from "@/components/shared/header-section";
import { useState } from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";
import { env } from "@/env.mjs";

type PricingPeriod = "annually" | "monthly" | "one-time";

interface PricingPlanData {
  id: number;
  product_id: string,
  title: string;
  price: string;
  quantity: number;
  description: string;
  features: { text: string; included: boolean }[];
  isPopular?: boolean;
}

interface PricingData {
  id: number;
  price: number;
  quantity: number;
}

export function PricingCards({ 
  userId, 
  emailAddress,
  pricingData 
}: { 
  userId?: string; 
  emailAddress?: string;
  pricingData: PricingData[];
}) {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<number | null>(null);
  const [period, setPeriod] = useState<PricingPeriod>("one-time");
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);
  const t = useTranslations('PricingPage');

  const allPricingData: Record<PricingPeriod, PricingPlanData[]> = {
    annually: [
      {
        id: pricingData[0].id,
        product_id: '1',
        title: "plans.1.title",
        price: `$${pricingData[0].price}`,
        quantity: pricingData[0].quantity,
        description: "plans.1.description",
        features: [
          { text: "plans.annually.1.features.0", included: true },
          { text: "plans.annually.1.features.1", included: true },
          { text: "plans.annually.1.features.2", included: true },
          { text: "plans.annually.1.features.3", included: true },
          { text: "plans.annually.1.features.4", included: true },
          { text: "plans.annually.1.features.5", included: true },
          { text: "plans.annually.1.features.6", included: true },
          { text: "plans.annually.1.features.7", included: false },
        ],
      },
      {
        id: pricingData[1].id,
        product_id: '',
        title: "plans.2.title",
        price: `$${pricingData[1].price}`,
        quantity: pricingData[1].quantity,
        description: "plans.2.description",
        features: [
          { text: "plans.annually.2.features.0", included: true },
          { text: "plans.annually.2.features.1", included: true },
          { text: "plans.annually.2.features.2", included: true },
          { text: "plans.annually.2.features.3", included: true },
          { text: "plans.annually.2.features.4", included: true },
          { text: "plans.annually.2.features.5", included: true },
          { text: "plans.annually.2.features.6", included: true },
          { text: "plans.annually.2.features.7", included: false },
        ],
        isPopular: true,
      },
      {
        id: pricingData[2].id,
        product_id: '',
        title: "plans.3.title",
        price: `$${pricingData[2].price}`,
        quantity: pricingData[2].quantity,
        description: "plans.3.description",
        features: [
          { text: "plans.annually.3.features.0", included: true },
          { text: "plans.annually.3.features.1", included: true },
          { text: "plans.annually.3.features.2", included: true },
          { text: "plans.annually.3.features.3", included: true },
          { text: "plans.annually.3.features.4", included: true },
          { text: "plans.annually.3.features.5", included: true },
          { text: "plans.annually.3.features.6", included: true },
          { text: "plans.annually.3.features.7", included: false },
        ],
      },
    ],
    monthly: [
      {
        id: pricingData[0].id,
        product_id: '',
        title: "plans.1.title",
        price: `$${(pricingData[0].price * 1.25).toFixed(1)}`,
        quantity: pricingData[0].quantity,
        description: "plans.1.description",
        features: [
          { text: "plans.monthly.1.features.0", included: true },
          { text: "plans.monthly.1.features.1", included: true },
          { text: "plans.monthly.1.features.2", included: true },
          { text: "plans.monthly.1.features.3", included: true },
          { text: "plans.monthly.1.features.4", included: true },
          { text: "plans.monthly.1.features.5", included: true },
          { text: "plans.monthly.1.features.6", included: true },
          { text: "plans.monthly.1.features.7", included: false },
        ],
      },
      {
        id: pricingData[1].id,
        product_id: '',
        title: "plans.2.title",
        price: `$${(pricingData[1].price * 1.25).toFixed(1)}`,
        quantity: pricingData[1].quantity,
        description: "plans.2.description",
        features: [
          { text: "plans.monthly.2.features.0", included: true },
          { text: "plans.monthly.2.features.1", included: true },
          { text: "plans.monthly.2.features.2", included: true },
          { text: "plans.monthly.2.features.3", included: true },
          { text: "plans.monthly.2.features.4", included: true },
          { text: "plans.monthly.2.features.5", included: true },
          { text: "plans.monthly.2.features.6", included: true },
          { text: "plans.monthly.2.features.7", included: false },
        ],
        isPopular: true,
      },
      {
        id: pricingData[2].id,
        product_id: '',
        title: "plans.3.title",
        price: `$${(pricingData[2].price * 1.25).toFixed(1)}`,
        quantity: pricingData[2].quantity,
        description: "plans.3.description",
        features: [
          { text: "plans.monthly.3.features.0", included: true },
          { text: "plans.monthly.3.features.1", included: true },
          { text: "plans.monthly.3.features.2", included: true },
          { text: "plans.monthly.3.features.3", included: true },
          { text: "plans.monthly.3.features.4", included: true },
          { text: "plans.monthly.3.features.5", included: true },
          { text: "plans.monthly.3.features.6", included: true },
          { text: "plans.monthly.3.features.7", included: false },
        ],
      },
    ],
    "one-time": [
      {
        id: pricingData[0].id,
        product_id: 'prod_54resnez8YIzBKrSvm3yXi',
        title: "plans.1.title",
        price: `$${pricingData[0].price}`,
        quantity: pricingData[0].quantity,
        description: "plans.1.description",
        features: [
          { text: "plans.oneTime.1.features.0", included: true },
          { text: "plans.oneTime.1.features.1", included: true },
          { text: "plans.oneTime.1.features.2", included: true },
          { text: "plans.oneTime.1.features.3", included: true },
          { text: "plans.oneTime.1.features.4", included: true },
          { text: "plans.oneTime.1.features.5", included: true },
          { text: "plans.oneTime.1.features.6", included: true },
          { text: "plans.oneTime.1.features.7", included: false },
        ],
      },
      {
        id: pricingData[1].id,
        product_id: 'prod_54resnez8YIzBKrSvm3yXi',
        title: "plans.2.title",
        price: `$${pricingData[1].price}`,
        quantity: pricingData[1].quantity,
        description: "plans.2.description",
        features: [
          { text: "plans.oneTime.2.features.0", included: true },
          { text: "plans.oneTime.2.features.1", included: true },
          { text: "plans.oneTime.2.features.2", included: true },
          { text: "plans.oneTime.2.features.3", included: true },
          { text: "plans.oneTime.2.features.4", included: true },
          { text: "plans.oneTime.2.features.5", included: true },
          { text: "plans.oneTime.2.features.6", included: true },
          { text: "plans.oneTime.2.features.7", included: false },
        ],
        isPopular: true,
      },
      {
        id: pricingData[2].id,
        product_id: 'prod_54resnez8YIzBKrSvm3yXi',
        title: "plans.3.title",
        price: `$${pricingData[2].price}`,
        quantity: pricingData[2].quantity,
        description: "plans.3.description",
        features: [
          { text: "plans.oneTime.3.features.0", included: true },
          { text: "plans.oneTime.3.features.1", included: true },
          { text: "plans.oneTime.3.features.2", included: true },
          { text: "plans.oneTime.3.features.3", included: true },
          { text: "plans.oneTime.3.features.4", included: true },
          { text: "plans.oneTime.3.features.5", included: true },
          { text: "plans.oneTime.3.features.6", included: true },
          { text: "plans.oneTime.3.features.7", included: false },
        ],
      },
    ],
  };

  const currentPricing = allPricingData[period];

  const handlePurchase = async (plan: PricingPlanData) => {
    if (!userId) {
      toast.error(t("toast.signInRequired"));
      return;
    }

    setLoadingPlan(plan.id);
    try {
      const response = await fetch("/api/creem/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: plan.product_id,
          successUrl: `${env.NEXT_PUBLIC_APP_URL}`,
        }),
      });

      if (!response.ok) {
        throw new Error(t("toast.checkoutFailed"));
      }

      const { checkout_url } = await response.json();

      if (!checkout_url) {
        throw new Error(t("toast.invalidCheckoutUrl"));
      }

      window.location.href = checkout_url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error(t("toast.checkoutInitiationFailed"));
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <>
      <div className="mx-auto mb-12 flex w-full flex-col items-center gap-5">
        <HeaderSection
          label={t('label')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </div>

      <div className="mb-8 flex items-center justify-center gap-4 rounded-full bg-muted p-1">
        <Button
          variant={period === "annually" ? "default" : "ghost"}
          onClick={() => setPeriod("annually")}
          className={cn(
            "rounded-full px-4 py-2 transition-all duration-300",
            period === "annually" ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted-foreground/10"
          )}
        >
          {t('period.annually')} 
          <Badge 
            className={cn(
              "ml-2 transition-all duration-300",
              period === "annually" ? "bg-primary-foreground text-primary" : "bg-primary/20 text-primary"
            )}
          >
            {t('period.discount')}
          </Badge>
        </Button>
        <Button
          variant={period === "monthly" ? "default" : "ghost"}
          onClick={() => setPeriod("monthly")}
          className={cn(
            "rounded-full px-4 py-2 transition-all duration-300",
            period === "monthly" ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted-foreground/10"
          )}
        >
          {t('period.monthly')}
        </Button>
        <Button
          variant={period === "one-time" ? "default" : "ghost"}
          onClick={() => setPeriod("one-time")}
          className={cn(
            "rounded-full px-4 py-2 transition-all duration-300",
            period === "one-time" ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted-foreground/10"
          )}
        >
          {t('period.oneTime')}
        </Button>
      </div>

      <div className="grid gap-6 pb-4 md:grid-cols-3">
        {currentPricing.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            handlePurchase={() => handlePurchase(plan)}
            isLoading={loadingPlan === plan.id}
            isAnyCardHovered={isAnyCardHovered}
            onAnyCardHover={setIsAnyCardHovered}
          />
        ))}
      </div>
      <div className="my-10 text-center">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t('trial_section_description')}
          <br />
          {t('1_credit_1_headshot')}
        </p>
      </div>
    </>
  );
}

function PricingCard({ 
  plan, 
  handlePurchase, 
  isLoading,
  isAnyCardHovered,
  onAnyCardHover
}: { 
  plan: PricingPlanData; 
  handlePurchase: (plan: PricingPlanData) => Promise<void>; 
  isLoading: boolean;
  isAnyCardHovered: boolean;
  onAnyCardHover: (hovered: boolean) => void;
}) {
  const t = useTranslations('PricingPage');
  const isMediumPackage = plan.isPopular;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onAnyCardHover(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onAnyCardHover(false);
  };

  const shouldShowPopularStyle = isMediumPackage && (!isAnyCardHovered || isHovered);

  return (
    <Card
      className={cn(
        "relative flex min-h-[550px] w-[320px] min-w-0 flex-1 flex-col justify-between transition-all duration-300",
        "bg-gradient-to-br from-background to-muted",
        "dark:from-gray-900 dark:to-black",
        shouldShowPopularStyle ? 'mt-4 overflow-visible border-primary ring-2 ring-primary' : 'mt-8 border border-border',
        isHovered && 'border-primary/50 ring-2 ring-primary/50',
        !isMediumPackage && isHovered && 'mt-4'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {shouldShowPopularStyle && (
        <div className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
          {t('most_popular')}
        </div>
      )}
      <CardHeader className="text-center">
        <Badge variant="outline" className="mb-2 self-center">
          {plan.quantity} {t('credits')}
        </Badge>
        <CardTitle className={`${shouldShowPopularStyle ? 'pb-2 text-3xl' : 'text-2xl'} font-bold`}>{plan.price}</CardTitle>
        <p className="line-clamp-2 text-sm text-muted-foreground">{t(plan.description)}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, idx) => {
            return (
              <li key={idx} className="flex items-center text-base">
                {feature.included ? (
                  <CheckCircle2 className="mr-2 size-4 shrink-0 text-green-500" />
                ) : (
                  <XCircle className="mr-2 size-4 shrink-0 text-red-500" />
                )}
                <span className="line-clamp-1 text-base text-muted-foreground">{t(feature.text)}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={cn(
            "w-full transition-all duration-300",
            isHovered ? "bg-gradient-to-r from-purple-600 to-pink-500" : "bg-gradient-to-r from-purple-500 to-pink-400",
            "text-white shadow-lg hover:from-purple-700 hover:to-pink-600"
          )}
          onClick={() => handlePurchase(plan)}
          disabled={isLoading}
        >
          {isLoading ? t('processing') : t('purchase')}
        </Button>
      </CardFooter>
    </Card>
  );
}
